import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

import styles from "./Navigation.module.scss";
const About = lazy(() => import("../components/About"));
const ChoosePatient = lazy(() => import("./ChoosePatient"));
const Intyg = lazy(() => import("./Intyg"));

export function Navigation() {
  return (
    <Router>
      <div>
        <Nav
          variant="pills"
          defaultActiveKey="/create"
          className={styles.navigation}
        >
          <LinkContainer to="/create">
            <Nav.Link>Sök / skriv intyg</Nav.Link>
          </LinkContainer>
          <LinkContainer to="enhet-arenden">
            <Nav.Link>Ej hanterade ärenden</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/unsigned">
            <Nav.Link>Ej signerade utkast</Nav.Link>
          </LinkContainer>
        </Nav>

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
