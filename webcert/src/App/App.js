import React, { useEffect } from "react";

import "./App.css";
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
    <div className="App">
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
