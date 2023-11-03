import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { listDecks, createDeck } from "../../utils/api";
import ErrorMessage from "../ErrorMessage";
import Breadcrumbs from "../Breadcrumbs";
import DeckForm from "./DeckForm"


export const CreateDeck = () => {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);

    const history = useHistory();

    const initialFormState = {
        name: "",
        description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });

    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks).catch(setError);
        return () => abortController.abort();
    }, []);
    if (error) {
        return <ErrorMessage error={error} />;
    }
    
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newId = decks.length > 0 ? Math.max(...decks.map(deck => deck.id)) + 1 : 1;
        await createDeck({...formData, id: newId});
        history.push(`/decks/${newId}`);
    }

    return (
        <div>
            <Breadcrumbs crumbs={[{name: "Create Deck", link: null}]}/>
            <h1>Create Deck</h1>
            <DeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} onCancel={() => history.push("/")} />
        </div>
    );

};

export default CreateDeck;
