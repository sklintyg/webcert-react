import React, { useReducer, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useParams } from "react-router-dom";

import styles from "./Certificates.module.scss";

import { UeRadio } from "../shared/UeRadio";
import UeDetails from "../shared/UeDetails";
import { WebcertMock } from "../../Services/WebcertService";

function _renderQuestions(category, dispatch) {
  let elements = category.questions.map((question, index) => {
    switch (question.config.component) {
      case "ue-radio":
        return (
          <UeRadio
            key={`UeRadioElement${index}`}
            name={question.config.dataName}
            value={question.data[question.config.dataName]}
            update={(value) =>
              dispatch({
                type: "UPDATE",
                index,
                name: question.config.dataName,
                value,
              })
            }
          />
        );
      case "ue-textarea":
        return null;
        // return (
        //   <UeDetails
        //     key={`UeDetailsElement${index}`}
        //     label={question.config.text}
        //     value={question.data[question.config.dataName]}
        //     update={(value) =>
        //       dispatch({
        //         type: "UPDATE",
        //         index,
        //         name: question.config.dataName,
        //         value,
        //       })
        //     }
        //   />
        // );
        break;
      default:
        return null;
    }
  });

  return elements;
}

function reducer(state, action) {
  let { data } = state;

  switch (action.type) {
    case "LOAD_CERTIFICATE":
      return { ...state, certElement: action.certElement };
    case "LOAD_DATA":
      return {
        ...state,
        categories: action.categories,
        metadata: action.metadata,
        renderElements: true,
      };
    case "RENDER_CERTIFICATE":
      return {
        ...state,
        certificateElements: action.certificateElements,
        renderElements: false,
      };

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
  // certificateCode = "AF00213";

  const [state, dispatch] = useReducer(reducer, {
    metadata: undefined,
    categories: undefined,
    certificateElements: null,
    renderElements: false,
  });
  const { certificateElements, categories, metadata, renderElements } = state;
  const webcertService = new WebcertMock();

  useEffect(() => {
    let isCurrent = true;

    function getCertificateData() {
      if (certificateCode && certificateId) {
        webcertService
          .createDynamicCertificate(certificateCode)
          .then((response) => {
            if (isCurrent) {
              dispatch({
                type: "LOAD_DATA",
                metadata: response.metadata,
                categories: response.categories,
              });
            }
          });
      }
    }

    if (certificateId) {
      getCertificateData();
    } else {
      console.log("TODO certId", certificateId);
    }
    return () => (isCurrent = false);
  }, [webcertService, certificateCode, certificateId]);

  useEffect(() => {
    let isCurrent = true;
    function createCertificateElements() {
      const elements = categories.map((category, index) => {
        // const questions = _renderQuestions(category, dispatch);

        return (
          <Card className={styles.card} key={`category${index}`}>
            <Card.Header>{category.config.text}</Card.Header>
            {/* {questions} */}
          </Card>
        );
      });

      if (isCurrent) {
        console.log("elements:", elements);
        dispatch({ type: "RENDER_CERTIFICATE", certificateElements: elements });
      }
    }

    if (!certificateElements && categories) {
      createCertificateElements();
    }

    return () => (isCurrent = false);
  }, [categories, certificateElements]);

  return (
    <div>
      {certificateElements}
      <Button
        type="submit"
        // disable={status === "loading"}
        onClick={() => dispatch({ type: "SUBMIT", status: "loading" })}
      >
        Signera och skicka
      </Button>
    </div>
  );
}
