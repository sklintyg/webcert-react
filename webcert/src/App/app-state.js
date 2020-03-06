import React, { createContext, useContext, useReducer } from "react";

const Context = createContext(undefined);

export function AppStateProvider({ reducer, initState = {}, children }) {
  const value = useReducer(reducer, initState);

  return <Context.Provider value={value} children={children} />;
}

export function useAppState() {
  return useContext(Context);
}
