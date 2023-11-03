import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck, deleteDeck } from "../../utils/api";
import ErrorMessage from "../ErrorMessage";
import Breadcrumbs from "../Breadcrumbs";
import Card from "./ViewCard"

export const ViewDeck = () => {
    const [deck, setDeck] = useState({ cards: [] });
    const [error, setError] = useState(undefined);
    
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

        return () => abortController.abort();
    }, [deckId]);

    if (error) {
        return (
        <ErrorMessage error={error}>
            <p>
                <Link to='/'>Return Home</Link>
            </p>
        </ErrorMessage>
        );
    }

    const handleDeleteDeck = async (id) => {
        const result = window.confirm("Delete this deck?");
        if (result) {
            await deleteDeck(id);
            history.push("/");
        }
    };

    if (deck.id) {
        return (
            <div>
                <Breadcrumbs crumbs={[{name: deck.name, link: null}]}/>
                <h1>{deck.name}</h1>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary" style={{margin: "5px"}}>Edit</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary" style={{margin: "5px"}}>Study</Link>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary" style={{margin: "5px"}}>Add Cards</Link>
                <button onClick={() => handleDeleteDeck(deck.id)} className="btn btn-danger" style={{float: "right", margin: "5px"}}>Delete</button>
                
                <h2 style={{marginTop: "20px"}}>Cards</h2>
                {deck.cards.map((card, index) => <Card key={index} card={card} />)}
            </div>
        );
    } else {
        return (
            <div className="p-4">
                <p>Loading...</p>
            </div>
        );
    }
};

export default ViewDeck;
