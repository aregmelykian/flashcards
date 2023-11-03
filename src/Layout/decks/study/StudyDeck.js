import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { readDeck } from "../../../utils/api";
import ErrorMessage from "../../ErrorMessage";
import Breadcrumbs from "../../Breadcrumbs";
import Card from "./StudyCard";

export const StudyDeck = () => {
    const [deck, setDeck] = useState({ cards: [] });
    const [error, setError] = useState(undefined);
    const [cardId, setCardId] = useState(0);
    const { deckId } = useParams();

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

    if (deck.id) {
        return (
            <div>
                <Breadcrumbs crumbs={[{name: deck.name, link: `/decks/${deck.id}`}, {name: "Study", link: null}]}/>
                <h1>{deck.name}: Study</h1>
                <Card cards={deck.cards} cardId={cardId} setCardId={setCardId} />
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

export default StudyDeck;
