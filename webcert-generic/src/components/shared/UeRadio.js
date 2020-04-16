import React from "react";
import Form from "react-bootstrap/Form";

export function UeRadio(props) {
  const { name, value, update } = props;

  return (
    <>
      <Form.Check
        value="ja"
        checked={value === "ja"}
        onChange={() => update("ja")}
        custom
        inline
        label="Ja"
        type="radio"
        id={`${name}Ja`}
      />
      <Form.Check
        value="nej"
        checked={value === "nej"}
        onChange={(e) => {
          console.log("negativ radio:", e.target.value);
          update("nej");
        }}
        custom
        inline
        label="Nej"
        type="radio"
        id={`${name}Nej`}
      />
    </>
  );
}
