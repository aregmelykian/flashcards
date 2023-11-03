import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { readDeck, deleteDeck } from "../../utils/api";
import ErrorMessage from "../ErrorMessage";



export const Deck = ({ deck }) => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(undefined);

    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deck.id, abortController.signal).then((resp) => setCards(resp.cards)).catch(setError);

        return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorMessage error={error} />;
    }

    const handleDelete = async (id) => {
        const result = window.confirm("Delete this deck?");
        if (result) {
            await deleteDeck(id);
            history.go(0);
        }
    };

    return (
        <article className="col-sm-6" style={{marginTop: "25px"}}>
            <div className="card">
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h5 className="card-title">{deck.name}</h5>
                            </div>
                            <div className="col-4">
                                <p style={{float: "right"}}>{cards.length} cards</p>
                            </div>
                        </div>
                    </div>
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary" style={{margin: "5px"}}>View</Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary" style={{margin: "5px"}}>Study</Link>
                    <button onClick={() => handleDelete(deck.id)} className="btn btn-danger" style={{float: "right", margin: "5px"}}>Delete</button>
                </div>
            </div>
        </article>
    );
}

export default Deck;