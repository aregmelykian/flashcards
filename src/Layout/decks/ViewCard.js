import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard } from "../../utils/api";


export const Card = ({ card }) => {
    const { deckId } = useParams();
    const history = useHistory();

    const handleDelete = async (id) => {
        const result = window.confirm("Delete this card?");
        if (result) {
            await deleteCard(id);
            history.go(0);
        }
    };

    return (
        <article className="col-sm-6" style={{marginTop: "5px"}}>
            <div className="card">
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="card-title">{card.front}</p>
                            </div>
                            <div className="col">
                                <p style={{float: "right"}}>{card.back}</p>
                            </div>
                        </div>
                    </div>
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary" style={{margin: "5px"}}>Edit</Link>
                    <button onClick={() => handleDelete(card.id)} className="btn btn-danger" style={{float: "right", margin: "5px"}}>Delete</button>
                </div>
            </div>
        </article>
    );
}

export default Card;