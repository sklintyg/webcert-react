import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { WebcertMock } from "../Services/WebcertService";
import WcPageHeader from "./WcPageHeader";
import { ErrorBoundary } from "./ErrorBoundary";

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_DATA":
      return { ...state, person: action.person };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}
export default function Intyg() {
  const [state, dispatch] = useReducer(reducer, {
    data: {}
  });

  const webcertMock = new WebcertMock();
  const { person } = state;
  let { id } = useParams();

  useEffect(() => {
    if (id && !person) {
      console.log("id,", id);
      webcertMock
        .getPatient()
        .then(data => dispatch({ type: "LOAD_DATA", person: data }));
    }
  }, [id, webcertMock, person]);
  console.log("person", person);
  return (
    <>
      <ErrorBoundary>
        <h1>Intyg</h1>
        <WcPageHeader
          fornamn={person?.fornamn}
          mellannamn={person?.mellannamn}
          efternamn={person?.efternamn}
          personnummer={person?.personnummer}
        />
      </ErrorBoundary>
    </>
  );
}
