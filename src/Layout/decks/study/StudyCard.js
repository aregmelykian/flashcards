import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import NotEnoughCards from "./NotEnoughCards"


export const Card = ({ cards, cardId, setCardId }) => {
    const [flip, setFlip] = useState(false);

    const history = useHistory();

    const handleNext = () => {
        setCardId(prev => prev + 1);

        if (Number(cardId) == cards.length - 1) {
            const result = window.confirm("Restart cards?");
            if (result) {
                setCardId(0);
            } else {
                history.push("/");
            }
        }

        setFlip(!flip)
    }

    if (cards.length < 3) {
        return <NotEnoughCards cards={cards} />
    } else {
        return (
            <article className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <div className="container">
                            <h5 className="card-title">Card {Number(cardId) + 1} of {cards.length}</h5>
                        </div>
                        <p className="card-text">{flip ? cards.at(cardId).back : cards.at(cardId).front}</p>
                        <button onClick={() => setFlip(!flip)} className="btn btn-secondary" style={{margin: "5px"}}>Flip</button>
                        {flip ? <button onClick={handleNext} className="btn btn-primary" style={{margin: "5px"}}>Next</button> : null}
                    </div>
                </div>
            </article>
        );
    }
}

export default Card;