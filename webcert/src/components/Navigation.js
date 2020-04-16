import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

import styles from "./Navigation.module.scss";

const About = lazy(() => import("../components/About"));
const DynamicForm = lazy(() =>
  import("../components/Certificates/DynamicForm")
);
const ChoosePatient = lazy(() => import("./ChoosePatient"));
const Certificate = lazy(() => import("./Certificate"));
const CertificateForm = lazy(() => import("./Certificates/CertificateForm"));

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
          <LinkContainer to="/enhet-arenden">
            <Nav.Link>Ej hanterade ärenden</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/unsigned">
            <Nav.Link>Ej signerade utkast</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>TEST</Nav.Link>
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
          <Route path="/create/certificate/:id">
            <Suspense fallback={<p>Laddar data...</p>}>
              <Certificate />
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense fallback={<p>Laddar data...</p>}>
              <CertificateForm />
            </Suspense>
          </Route>
          <Route path="/certificate/:certificateCode/:certificateId">
            <Suspense fallback="Läser in data för intyg...">
              <CertificateForm />
            </Suspense>
          </Route>
          <Route path="/users">{/* <Users /> */}</Route>
          <Route path="/">{/* <Home /> */}</Route>
        </Switch>
      </Router>
    </Container>
  );
}
