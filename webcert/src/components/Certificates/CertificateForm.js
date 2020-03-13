import React, { useReducer, useEffect, lazy } from "react";
import Button from "react-bootstrap/Button";

import { useParams } from "react-router-dom";

import styles from "./Certificates.module.scss";
import { WebcertMock } from "../../Services/WebcertService";

import { Check } from "../shared/Check";

const Af00213 = lazy(() => import("./Af00213"));

function renderCert(certificateId) {
  switch (certificateId) {
    case "AF00213":
      return (
        <React.Suspense fallback={<p>Laddar data...</p>}>
          <Af00213 />
        </React.Suspense>
      );
    default:
      return null;
  }
}

function renderElement(item, data, dispatch, index) {
  switch (item.type) {
    case "CHECKBOX":
      return (
        <Check
          value={data[item.name]}
          dispatch={dispatch}
          update={data =>
            dispatch({ type: "UPDATE", name: item.name, value: data.value })
          }
          label={item.label}
          id={`${index}-${item.name}`}
          key={`${index}-${item.name}`}
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
      return { ...state, data: action.data, elements: action.elements };
    case "SUBMIT":
      return { ...state };
    case "UPDATE":
      data[action.name] = action.value;
      return { ...state, data };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
export default function CertificateForm() {
  let { certificateId, id } = useParams();

  const [state, dispatch] = useReducer(reducer, {
    data: {},
    elements: null,
    certElement: null
  });
  const { data, certElement } = state;
  const webcertService = new WebcertMock();

  useEffect(() => {
    if (certificateId) {
      const element = renderCert(certificateId);

      dispatch({ type: "LOAD_CERTIFICATE", certElement: element });
    }
  }, [certificateId, dispatch]);
  // useEffect(() => {
  //   console.log("data:", data);
  //   let isCurrent = true;

  //   if (certificateId && !elements) {
  //     webcertService.createCertificate(certificateId).then(response => {
  //       if (isCurrent) {
  //         const fields = response.fields;

  //         const createElements = fields.map((item, index) => (
  //           <Card className={styles.card}>
  //             <Card.Header>{item.header}</Card.Header>
  //             <Card.Text>{item.text}</Card.Text>
  //             {renderElement(item, data[item.name], dispatch, index)}
  //           </Card>
  //         ));
  //         dispatch({
  //           type: "LOAD_DATA",
  //           data: response.data,
  //           elements: createElements
  //         });
  //       }
  //     });
  //   }
  //   return () => (isCurrent = false);
  // }, [data, webcertService, elements, certificateId]);

  return <div>{certElement}</div>;
}
