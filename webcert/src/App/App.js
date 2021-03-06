import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { AppStateProvider, useAppState } from "./app-state";
import appReducer, { inititalState } from "./appReducer";

import { Header } from "../components/Header";
import { Navigation } from "../components/Navigation";

function App() {
  const [, appDispatch] = useAppState();

  useEffect(() => {
    Promise.resolve(appDispatch({ type: "DEMO_NAME", name: "userName" }));
  }, [appDispatch]);

  return (
    <div>
      <Header />
      <Navigation />
    </div>
  );
}

export default props => (
  <AppStateProvider reducer={appReducer} initState={inititalState}>
    <App />
  </AppStateProvider>
);
