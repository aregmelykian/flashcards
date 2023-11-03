import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./home/DeckList"
import CreateDeck from "./decks/CreateDeck"
import StudyDeck from "./decks/study/StudyDeck"
import ViewDeck from "./decks/ViewDeck"
import EditDeck from "./decks/EditDeck"
import CreateCard from "./decks/cards/CreateCard"
import EditCard from "./decks/cards/EditCard"


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <DeckList />
          </Route>

          <Route path={"/decks/:deckId/study"}>
            <StudyDeck />
          </Route>

          <Route path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>

          <Route path={"/decks/:deckId/cards/new"}>
            <CreateCard />
          </Route>

          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>

          <Route path={"/decks/new"}>
            <CreateDeck />
          </Route>

          <Route path={"/decks/:deckId"}>
            <ViewDeck />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
