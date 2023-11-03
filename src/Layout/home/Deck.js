import React from "react";
import { Link, useHistory } from "react-router-dom";

import { deleteDeck } from "../../utils/api";



export const Deck = ({ deck }) => {
    const history = useHistory();

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
                                <p style={{float: "right"}}>{deck.cards.length} cards</p>
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