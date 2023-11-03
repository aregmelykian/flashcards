import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../../utils/api";
import Breadcrumbs from "../Breadcrumbs";
import DeckForm from "./DeckForm"


export const CreateDeck = () => {
    const history = useHistory();

    const initialFormState = {
        name: "",
        description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
    
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await createDeck({...formData});
        history.push(`/decks/${resp.id}`);
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
