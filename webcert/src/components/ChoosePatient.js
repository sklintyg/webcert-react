import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const INIT_STATE = {
  ssn: undefined,
  submitSsn: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, submitSsn: true };
    case "UPDATE":
      state[action.name] = action.value;
      return { ...state };
    default:
      return { ...state };
  }
}

export default function ChoosePatient(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { ssn } = state;
  let history = useHistory();
  return (
    <>
      <Form
        onSubmit={e => {
          e.preventDefault();
          history.push(`/create/certificate/${ssn}`);
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            Patientens personnummer eller samordningsnummer
          </Form.Label>
          <Form.Control
            onChange={e =>
              dispatch({ type: "UPDATE", name: "ssn", value: e.target.value })
            }
            type="text"
            placeholder="ååååmmdd-nnnn"
            required
            maxLength="13"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
