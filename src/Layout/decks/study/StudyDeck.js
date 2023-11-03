import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { readDeck } from "../../../utils/api";
import ErrorMessage from "../../ErrorMessage";
import Breadcrumbs from "../../Breadcrumbs";
import StudyCard from "./StudyCard";

export const StudyDeck = () => {
    const [deck, setDeck] = useState({ cards: [] }); 
    const [error, setError] = useState(undefined);
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
                <StudyCard cards={deck.cards} />
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
