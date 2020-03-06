import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { WebcertMock } from "../Services/WebcertService";
import WcPageHeader from "./WcPageHeader";
import { ErrorBoundary } from "./ErrorBoundary";

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_PATIENT":
      console.log("LOAD_PATIENT", action);
      return { ...state, person: action.person };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}
export default function Intyg() {
  const [state, dispatch] = useReducer(reducer, {
    person: {},
    intyg: undefined
  });

  const webcertMock = new WebcertMock();
  const { person, intyg } = state;
  let { id } = useParams();

  useEffect(() => {
    let isCurrent = true;
    if (id && !person) {
      console.log("id,", id);

      webcertMock.getPatient().then(data => {
        if (isCurrent) {
          dispatch({ type: "LOAD_PATIENT", person: data });
        }
      });
    }

    return () => (isCurrent = false);
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
