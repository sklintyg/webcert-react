import React, { lazy, Suspense, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import styles from "./Navigation.module.scss";
const About = lazy(() => import("../components/About"));
const ChoosePatient = lazy(() => import("./ChoosePatient"));
const Intyg = lazy(() => import("./Intyg"));

export function Navigation() {
  return (
    <Router>
      <div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Sök / skriv intyg</Link>
            </li>
            <li>
              <Link to="/enhet-arenden">Ej hanterade ärenden</Link>
            </li>
            <li>
              <Link to="/unsigned">Ej signerade utkast</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/create">
            <Suspense fallback={<p>Laddar data...</p>}>
              <ChoosePatient />
            </Suspense>
          </Route>
          <Route path="/create/choose-intyg-type/:id">
            <Suspense fallback={<p>Laddar data...</p>}>
              <Intyg />
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense fallback={<p>Laddar data...</p>}>
              <About />
            </Suspense>
          </Route>
          <Route path="/users">{/* <Users /> */}</Route>
          <Route path="/">{/* <Home /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
}
