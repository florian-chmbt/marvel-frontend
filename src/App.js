// IMPORT DES PACKAGES
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  /*   Link,
  Redirect, */
} from "react-router-dom";

// IMPORT DES ROUTES (containers) ET COMPOSANTS (components)
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Characters from "./containers/Characters";
import ComicsById from "./containers/Comics_By_Id";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          {/* ROUTE COMICS BY ID ------------------------------------------------- */}
          {/* je choisi le nom de la variable passée en params */}
          <Route path="/comicsbyid/:idToto">
            <ComicsById />
          </Route>
          {/* ROUTE COMICS------------------------------------------------- */}
          <Route path="/comics">
            <Comics />
          </Route>
          {/* ROUTE COMICS ------------------------------------------------- */}
          <Route path="/comics">
            <Comics />
          </Route>
          {/* ROUTE CHARACTERS ------------------------------------------------- */}
          <Route path="/">
            <Characters />
          </Route>
          {/* ROUTE HOME ------------------------------------------------- */}
          {/* <Route path="/">
            <Home />
          </Route> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
