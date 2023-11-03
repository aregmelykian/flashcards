import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Deck from "./Deck";
import { listDecks } from "../../utils/api";
import ErrorMessage from "../ErrorMessage";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);

    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <main className="container">
        <Link to={`/decks/new`} className="btn btn-secondary" style={{margin: "5px"}}>Create Deck</Link>
        <section className="row">
          {decks.map((deck) => <Deck key={deck.id} deck={deck} />)}
        </section>
    </main>
  );
};

export default DeckList;
