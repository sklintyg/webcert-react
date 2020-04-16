import React from "react";

import { useAppState } from "../App/app-state";
import { ErrorBoundary } from "./ErrorBoundary";

export default function About() {
  const [appState] = useAppState();

  const { name } = appState;

  return (
    <ErrorBoundary>
      <div>
        <h1>About</h1>
        <h3>{name}</h3>
      </div>
    </ErrorBoundary>
  );
}
