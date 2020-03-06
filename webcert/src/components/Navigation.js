import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

import styles from "./Navigation.module.scss";
const About = lazy(() => import("../components/About"));
const ChoosePatient = lazy(() => import("./ChoosePatient"));
const Intyg = lazy(() => import("./Intyg"));
const Af00213 = lazy(() => import("./Intyg/Af00213"));
export function Navigation() {
  return (
    <Container>
      <Router>
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
          <Route path="/af00213">
            <Suspense fallback="Läser in data för intyg...">
              <Af00213 />
            </Suspense>
          </Route>
          <Route path="/users">{/* <Users /> */}</Route>
          <Route path="/">{/* <Home /> */}</Route>
        </Switch>
      </Router>
    </Container>
  );
}
