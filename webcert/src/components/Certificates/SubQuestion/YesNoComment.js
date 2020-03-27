import React, { useReducer, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import styles from "../Certificates.module.scss";

const INIT_STATE = {
  question: false,
  description: ""
};

function reducer(state, action) {
  console.log("reducer state:", state, "action:", action);
  switch (action.type) {
    case "INIT_STATE":
      return {
        ...state,
        question: action.question,
        description: action.description
      };

    case "UPDATE":
      state[action.name] = action.value;
      return { ...state };
    default:
      return { ...state };
  }
}

export default function YesNoQuestion(props) {
  const {
    data,
    descriptionLabel,
    descriptionProp,
    header,
    text,
    update,
    questionProp,
    index,
    required
  } = props;
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const { question, description } = state;

  useEffect(() => {
    function initState() {
      dispatch({
        type: "INIT_STATE",
        question: data[questionProp],
        description: data[descriptionProp]
      });
    }
    if (data) {
      initState();
    }
  }, [data, questionProp, descriptionProp]);

  useEffect(() => {
    function updateParent() {
      update({ name: questionProp, value: question });
    }

    if (questionProp) {
      updateParent();
    }
  }, [update, question, questionProp]);

  useEffect(() => {
    function updateParent() {
      update({ name: descriptionProp, value: description });
    }

    if (descriptionProp) {
      updateParent();
    }
  }, [description, descriptionProp, update]);

  return (
    <Card className={styles.card}>
      <Card.Header>{header}</Card.Header>
      <Form.Label required={required}>{text}</Form.Label>
      <Form.Check
        value={question}
        checked={question}
        onChange={() => {
          console.log("klick");
          dispatch({
            type: "UPDATE",
            name: "question",
            value: true
          });
        }}
        custom
        inline
        label="Ja"
        type="radio"
        id={`Y${descriptionProp}${index}`}
      />
      <Form.Check
        value={question}
        checked={!question}
        onChange={() =>
          dispatch({
            type: "UPDATE",
            name: "question",
            value: false
          })
        }
        custom
        inline
        label="Nej"
        type="radio"
        id={`N${descriptionProp}${index}`}
      />
      {question && (
        <Form.Group controlId="funktionsnedsattningDesc">
          <Form.Label required={question}>{descriptionLabel}</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            value={description}
            onChange={e =>
              dispatch({
                type: "UPDATE",
                name: "description",
                value: e.target.value
              })
            }
          />
        </Form.Group>
      )}
    </Card>
  );
}
