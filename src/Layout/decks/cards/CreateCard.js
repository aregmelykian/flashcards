import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import { readDeck, createCard } from "../../../utils/api";
import ErrorMessage from "../../ErrorMessage";
import Breadcrumbs from "../../Breadcrumbs";
import CardForm from "./CardForm"


export const CreateDeck = () => {
    const [deck, setDeck] = useState({ cards: [] });
    const [error, setError] = useState(undefined);

    const { deckId } = useParams();

    const history = useHistory();

    const initialFormState = {
        front: "",
        back: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });

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
    
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, {...formData});
        setFormData({ ...initialFormState });
    }

    if (deck.id) {
        return (
            <div>
                <Breadcrumbs crumbs={[{name: deck.name, link: `/decks/${deck.id}`}, {name: "Add Card", link: null}]}/>
                <h1>{deck.name}: Add Card</h1>
                <CardForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} onCancel={() => history.push(`/decks/${deck.id}`)} cancelButtonName={"Done"} />
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

export default CreateDeck;
