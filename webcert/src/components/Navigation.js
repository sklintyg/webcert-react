import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const About = lazy(() =>
  import("../components/About" /*webpackChunkName: about */)
);

export function Navigation() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
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
