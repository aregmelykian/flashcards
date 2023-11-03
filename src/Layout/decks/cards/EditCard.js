import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import { readDeck, readCard, updateCard } from "../../../utils/api";
import ErrorMessage from "../../ErrorMessage";
import Breadcrumbs from "../../Breadcrumbs";
import CardForm from "./CardForm"


export const EditCard = () => {
    const [deck, setDeck] = useState({ cards: [] });
    const [card, setCard] = useState({ cards: [] });
    const [newCardId, setNewCardId] = useState(0);
    const [error, setError] = useState(undefined);

    const { deckId, cardId } = useParams();

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

    useEffect(() => {
        const abortController = new AbortController();
        
        readCard(cardId, abortController.signal).then(res => {
            setCard(res);
            setFormData({...res})
        }).catch(setError);

        return () => abortController.abort();
    }, [cardId]);

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
        await updateCard({...formData, id: cardId});
        history.push(`/decks/${deck.id}`)
    }

    if (deck.id) {
        return (
            <div>
                <Breadcrumbs crumbs={[{name: deck.name, link: `/decks/${deck.id}`}, {name: `Edit Card ${cardId}`, link: null}]}/>
                <h1>Edit Card</h1>
                <CardForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} onCancel={() => history.push(`/decks/${deck.id}`)} cancelButtonName={"Cancel"} />
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

export default EditCard;
