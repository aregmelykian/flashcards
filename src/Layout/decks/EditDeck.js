import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import { readDeck, updateDeck } from "../../utils/api";
import ErrorMessage from "../ErrorMessage";
import Breadcrumbs from "../Breadcrumbs";
import DeckForm from "./DeckForm"


export const EditDeck = () => {
    const [deck, setDeck] = useState({});
    const [error, setError] = useState(undefined);

    const initialFormState = {
        name: "",
        description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });

    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        
        readDeck(deckId, abortController.signal).then(res => {
            setDeck(res);
            setFormData({...res})
        }).catch(setError);

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
        await updateDeck({...formData, id: deckId});
        history.push(`/decks/${deckId}`);
    }

    if (deck.id) {
        return (
            <div>
                <Breadcrumbs crumbs={[{name: formData.name, link: `/decks/${deck.id}`}, {name: "Edit Deck", link: null}]}/>
                <h1>Edit Deck</h1>
                <DeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} onCancel={() => history.push(`/decks/${deckId}`)} />
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

export default EditDeck;
