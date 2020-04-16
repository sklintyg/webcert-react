import React, { lazy, useReducer, useEffect } from "react";

import { useParams } from "react-router-dom";

import styles from "./Certificates.module.scss";
import { WebcertMock } from "../../Services/WebcertService";

const AF00213 = lazy(() => import("./AF00213" /*webpackChunkName: "af00213"*/));

function _renderCertificate(certificateCode, certificateId) {
  switch (certificateCode) {
    case "AF00213":
      return <AF00213 />;
    default:
      return null;
  }
}

function reducer(state, action) {
  let { certificateData } = state;
  switch (action.type) {
    case "LOAD_CERTIFICATE":
      return { ...state, certificateElement: action.certificateElement };
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

const INIT_STATE = {
  certificateData: undefined,
  certificateElement: null,
};

export default function CertificateForm() {
  let { certificateCode, certificateId } = useParams();
  console.log(
    "certifcateCode:",
    certificateCode,
    "certificateId:",
    certificateId
  );

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const { certificateData, certificateElement } = state;
  const webcertService = new WebcertMock();

  useEffect(() => {
    function renderCertificate() {
      const certElement = _renderCertificate(certificateCode, certificateId);
      dispatch({ type: "LOAD_CERTIFICATE", certificateElement: certElement });
    }

    if (certificateCode) {
      renderCertificate();
    }
  }, [certificateCode]);

  return <div>{certificateElement}</div>;
}
