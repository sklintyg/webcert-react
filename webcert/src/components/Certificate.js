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
    case "LOAD_CERTIFICATES":
      return { ...state, certificates: action.certificates };
    case "LOAD_CURRENT_CERTIFICATES":
      return { ...state, currentCertificates: action.currentCertificates.data };
    case "OPEN_CERTIFICATE":
      return { ...state };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}
export default function Certificate() {
  const [state, dispatch] = useReducer(reducer, {
    patient: undefined,
    certificates: undefined,
    status: "idle",
    newCertificate: undefined,
    currentCertificates: undefined
  });

  const webcertMock = new WebcertMock();
  const {
    patient,
    certificates,
    status,
    newCertificate,
    currentCertificates
  } = state;
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
    if (id && !certificates) {
      webcertMock.getCertificates().then(data => {
        if (isCurrent) {
          dispatch({ type: "LOAD_CERTIFICATES", certificates: data });
        }
      });
    }

    return () => (isCurrent = false);
  }, [id, webcertMock, certificates]);

  useEffect(() => {
    let isCurrent = true;
    function getCurrentCertificates() {
      webcertMock.getCurrentCertificates().then(response => {
        console.log("current certs:", response);
        if (isCurrent) {
          dispatch({
            type: "LOAD_CURRENT_CERTIFICATES",
            currentCertificates: response
          });
        }
      });
    }

    if (!currentCertificates) {
      getCurrentCertificates();
    }

    return () => (isCurrent = false);
  }, [webcertMock, currentCertificates]);

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
          {certificates &&
            certificates.map((item, index) => (
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
        <ul>
          {currentCertificates &&
            currentCertificates.map((item, index) => (
              <li key={index}>
                {item.metadata.certificateName} {item.metadata.certificateCode}{" "}
                <span className="text-right">
                  <Button
                    className={styles.createCertificate}
                    onClick={() =>
                      dispatch({
                        type: "OPEN_CERTIFICATE",
                        status: "loading",
                        newCertificate: item.code
                      })
                    }
                  >
                    Öppna
                  </Button>
                </span>
              </li>
            ))}
        </ul>
      </ErrorBoundary>
    </>
  );
}
