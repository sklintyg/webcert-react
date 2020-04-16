import React, { useReducer, useEffect } from "react";

import { useParams } from "react-router-dom";

import styles from "./Certificates.module.scss";
import { WebcertMock } from "../../Services/WebcertService";

function reducer(state, action) {
  let { certificateData } = state;
  switch (action.type) {
    case "LOAD_CERTIFICATE":
      return { ...state, certElement: action.certElement };
    case "LOAD_DATA":
      return { ...state, certificateData: action.certificateData };
    case "SUBMIT":
      return { ...state };
    case "UPDATE":
      certificateData[action.name] = action.value;
      return { ...state, certificateData };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
export default function CertificateForm() {
  let { certificateCode, certificateId } = useParams();
  console.log(
    "certifcateCode:",
    certificateCode,
    "certificateId:",
    certificateId
  );

  const [state, dispatch] = useReducer(reducer, {
    certificateData: undefined,
    elements: null,
    certElement: null,
  });

  const { certificateData, certElement } = state;
  const webcertService = new WebcertMock();

  useEffect(() => {
    function getCertificateData() {
      webcertService
        .getTwoLevelData(certificateCode, certificateId)
        .then((response) =>
          dispatch({ type: "LOAD_DATA", certificateData: response })
        );
    }

    if (!certificateData) {
      getCertificateData();
    }
  }, [webcertService, certificateData, certificateCode, certificateId]);

  useEffect(() => {
    function buildCertificate() {
      const elements = certificateData.categories
        .map((element, index) => {
          return (
            <div key={index}>
              <h1>{element.config.text}</h1>
              {_renderElements(index, element.questions)}
            </div>
          );
        })
        .filter((item) => item);

      dispatch({ type: "LOAD_CERTIFICATE", certElement: elements });
    }

    if (certificateData) {
      buildCertificate();
    }
  }, [certificateData]);

  return <div>{certElement}</div>;
}

function _renderElements(index, questions) {
  const elements = questions.map((question) => _component(question));

  return elements;
}

function _component(question) {
  const { id, config, data, validation } = question;

  switch (config.component) {
    default:
      return null;
  }
}
