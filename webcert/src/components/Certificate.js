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
      return { ...state, patient: action.patient };
    case "LOAD_CERTIFICATE":
      return { ...state, certificate: action.certificate };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}
export default function Certificate() {
  const [state, dispatch] = useReducer(reducer, {
    patient: undefined,
    certificate: undefined,
    status: "idle",
    newCertificate: undefined
  });

  const webcertMock = new WebcertMock();
  const { patient, certificate, status, newCertificate } = state;
  let { id } = useParams();
  let history = useHistory();

  // load patient details
  useEffect(() => {
    let isCurrent = true;

    if (id && !patient) {
      webcertMock.getPatient().then(data => {
        if (isCurrent) {
          dispatch({ type: "LOAD_PATIENT", patient: data });
        }
      });
    }

    return () => (isCurrent = false);
  }, [id, patient, webcertMock]);

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
      webcertMock.createCertificate().then(data => {
        history.push(
          `/certificate/${newCertificate}/${data.metadata.certificateId}`
        );
      });
    }

    return () => (isCurrent = false);
  }, [status, newCertificate, webcertMock, history]);

  console.log("patient", patient);
  return (
    <>
      <ErrorBoundary>
        <h1>Intyg</h1>
        <WcPageHeader
          firstName={patient?.firstName}
          middleName={patient?.middleName}
          lastName={patient?.lastName}
          ssn={patient?.ssn}
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
