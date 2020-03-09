import React, { useEffect, useReducer } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./Certificate.module.scss";
import { WebcertMock } from "../Services/WebcertService";
import WcPageHeader from "./WcPageHeader";
import { ErrorBoundary } from "./ErrorBoundary";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_CERTIFICATE":
      return {
        ...state,
        status: action.status,
        newCertificate: action.newCertificate
      };
    case "LOAD_PATIENT":
      console.log("LOAD_PATIENT", action);
      return { ...state, person: action.person };
    case "LOAD_CERTIFICATE":
      return { ...state, certificate: action.certificate };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}
export default function Certificate() {
  const [state, dispatch] = useReducer(reducer, {
    person: {},
    certificate: undefined,
    status: "idle",
    newCertificate: undefined
  });

  const webcertMock = new WebcertMock();
  const { person, certificate, status, newCertificate } = state;
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
    if (id && !certificate) {
      webcertMock.getCertificate().then(data => {
        if (isCurrent) {
          dispatch({ type: "LOAD_CERTIFICATE", certificate: data });
        }
      });
    }

    return () => (isCurrent = false);
  }, [id, webcertMock, certificate]);

  useEffect(() => {
    let isCurrent = true;
    const isIdle = status === "idle";
    const isLoading = status === "loading";
    const isSuccess = status === "success";
    const isError = status === "error";

    if (isLoading && newCertificate) {
      console.log("SKAPA INTYG kod:", newCertificate);
      webcertMock.createCertificate().then(data => {
        console.log("SKAPAT INTYG:", data);
        history.push(`/${newCertificate}/edit/${data.metadata.certificateId}`);
      });
    }

    return () => (isCurrent = false);
  }, [status, newCertificate, webcertMock, history]);

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
        <h2>Skapa certificate</h2>
        <ul>
          {certificate &&
            certificate.map((item, index) => (
              <li key={index}>
                {item.name} {item.code}{" "}
                <span className="text-right">
                  <Button
                    className={styles.createCertificate}
                    onClick={() =>
                      dispatch({
                        type: "CREATE_CERTIFICATE",
                        status: "loading",
                        newCertificate: item.code
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
