import React from "react";
import Form from "react-bootstrap/Form";

export default function UeDetails(props) {
  const { label, value, update } = props;

  return (
    <>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="textarea"
          value={value}
          rows={5}
          onChange={(e) => update(e.target.value)}
        ></Form.Control>
      </Form.Group>
    </>
  );
}
