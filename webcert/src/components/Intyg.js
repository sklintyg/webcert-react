import React, { useEffect, useReducer } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./Intyg.module.scss";
import { WebcertMock } from "../Services/WebcertService";
import WcPageHeader from "./WcPageHeader";
import { ErrorBoundary } from "./ErrorBoundary";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_INTYG":
      return { ...state, status: action.status, newIntyg: action.newIntyg };
    case "LOAD_PATIENT":
      console.log("LOAD_PATIENT", action);
      return { ...state, person: action.person };
    case "LOAD_INTYG":
      return { ...state, intyg: action.intyg };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}
export default function Intyg() {
  const [state, dispatch] = useReducer(reducer, {
    person: {},
    intyg: undefined,
    status: "idle",
    newIntyg: undefined
  });

  const webcertMock = new WebcertMock();
  const { person, intyg, status, newIntyg } = state;
  let { id } = useParams();
  let history = useHistory();

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

  useEffect(() => {
    let isCurrent = true;
    if (id && !intyg) {
      console.log("id,", id);

      webcertMock.getIntyg().then(data => {
        if (isCurrent) {
          dispatch({ type: "LOAD_INTYG", intyg: data });
        }
      });
    }

    return () => (isCurrent = false);
  }, [id, webcertMock, intyg]);

  useEffect(() => {
    let isCurrent = true;
    const isIdle = status === "idle";
    const isLoading = status === "loading";
    const isSuccess = status === "success";
    const isError = status === "error";

    if (isLoading && newIntyg) {
      console.log("SKAPA INTYG kod:", newIntyg);
      webcertMock.createIntyg().then(data => {
        console.log("SKAPAT INTYG:", data);
        history.push(`/${newIntyg}/edit/${data.metadata.intygId}`);
      });
    }

    return () => (isCurrent = false);
  }, [status, newIntyg, webcertMock]);

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
        <h2>Skapa intyg</h2>
        <ul>
          {intyg &&
            intyg.map((item, index) => (
              <li key={index}>
                {item.name} {item.code}{" "}
                <span className="text-right">
                  <Button
                    className={styles.createIntyg}
                    onClick={() =>
                      dispatch({
                        type: "CREATE_INTYG",
                        status: "loading",
                        newIntyg: item.code
                      })
                    }
                  >
                    Skapa intyg
                  </Button>
                </span>
              </li>
            ))}
        </ul>

        <h2>Tidigare intyg</h2>
      </ErrorBoundary>
    </>
  );
}
