import React, { useReducer, useEffect, lazy } from "react";

import Button from "react-bootstrap/Button";

import { useParams } from "react-router-dom";

import styles from "./Certificates.module.scss";
import { WebcertMock } from "../../Services/WebcertService";

const YesNoComment = lazy(() => import("./SubQuestion/YesNoComment"));
const AF00213 = lazy(() => import("./AF00213"));
const FK7804 = lazy(() => import("./FK7804"));

function renderCert(certificateCode) {
  switch (certificateCode) {
    case "AF00213":
      return (
        <React.Suspense fallback={<p>Laddar data...</p>}>
          <AF00213 />
        </React.Suspense>
      );
    case "FK7804":
      return (
        <React.Suspense fallback={<p>Laddar data...</p>}>
          <FK7804 />
        </React.Suspense>
      );
    default:
      return null;
  }
}

function renderQuestions(item, data, dispatch, index) {
  switch (item.type) {
    case "YES_NO_COMMENT":
      return (
        <YesNoComment
          key={index}
          index={index}
          data={data}
          update={newValue =>
            dispatch({
              type: "UPDATE",
              name: newValue.name,
              value: newValue.value
            })
          }
          {...item}
        />
      );
    default:
      return;
  }
}

function reducer(state, action) {
  let { data } = state;

  switch (action.type) {
    case "LOAD_CERTIFICATE":
      return { ...state, certElement: action.certElement };
    case "LOAD_DATA":
      return { ...state, data: action.data, metadata: action.metadata };
    case "LOAD_ELEMENTS":
      return { ...state, elements: action.elements };

    case "SUBMIT":
      return { ...state, save: !state.save, status: action.status };
    case "UPDATE":
      data[action.name] = action.value;
      return { ...state, data };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
export default function DynamicForm() {
  let { certificateCode, certificateId } = useParams();
  certificateCode = "AF00213";

  const [state, dispatch] = useReducer(reducer, {
    data: {},
    metadata: {},
    elements: null,
    certElement: null,
    save: false,
    status: "idle"
  });
  const { data, elements, save, status, metadata } = state;
  const webcertService = new WebcertMock();

  useEffect(() => {
    let isCurrent = true;

    function getCertificate() {
      if (certificateCode && !elements) {
        console.log();
        webcertService
          .createDynamicCertificate(certificateCode)
          .then(response => {
            if (isCurrent) {
              dispatch({
                type: "LOAD_DATA",
                data: response.data,
                metadata: response.metadata
              });
              const sections = response.sections;

              const createElements = sections.map((section, index) =>
                renderQuestions(section, response.data, dispatch, index)
              );
              dispatch({
                type: "LOAD_ELEMENTS",
                elements: createElements
              });
            }
          });
      }
    }

    if (!certificateId) {
      getCertificate();
    } else {
      console.log("TODO certId", certificateId);
    }
    return () => (isCurrent = false);
  }, [elements, webcertService, certificateCode, data, certificateId]);

  useEffect(() => {
    function submitCertificate() {
      webcertService
        .saveData(metadata.certificateId, data, metadata)
        .then(() => {
          dispatch({ type: "SUBMIT", status: "idle" });
        });
    }

    if (save) {
      submitCertificate();
    }
  }, [save, data, metadata, webcertService]);

  return (
    <div>
      {elements}
      <Button
        type="submit"
        disable={status === "loading"}
        onClick={() => dispatch({ type: "SUBMIT", status: "loading" })}
      >
        Signera och skicka
      </Button>
    </div>
  );
}
