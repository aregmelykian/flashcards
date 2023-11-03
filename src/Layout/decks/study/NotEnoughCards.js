import React from "react";
import { Link, useParams } from "react-router-dom";

export const NotEnoughCards = ({ cards }) => {
    const { deckId } = useParams();

    return (
        <div>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. You have {cards.length} cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary" style={{margin: "5px"}}>Add Cards</Link>
        </div>
    )
}

export default NotEnoughCards;