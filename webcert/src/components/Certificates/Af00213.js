import React, { useReducer } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import styles from "./Certificates.module.scss";

const INIT_STATE = {
  data: {
    funktionsnedsattning: false,
    funktionsnedsattningDesc: "",
    utredningBehandling: false,
    utredningBehandlingDesc: "",
    arbetePaverkanSjukdomSkada: false,
    arbetePaverkanSjukdomSkadaDesc: ""
  }
};
function reducer(state, action) {
  let { data } = state;
  switch (action.type) {
    case "UPDATE":
      data[action.name] = action.value;
      return { ...state, data };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
export default function Af00213() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const { data } = state;
  return (
    <div>
      <Card className={styles.card}>
        <Card.Header>Funktionsnedsättning</Card.Header>
        <Card.Text>
          Finns besvär på grund av sjukdom eller skada som medför
          funktionsnedsättning?
        </Card.Text>
        <Form.Check
          value={data.funktionsnedsattning}
          checked={data.funktionsnedsattning}
          onChange={() =>
            dispatch({
              type: "UPDATE",
              name: "funktionsnedsattning",
              value: true
            })
          }
          custom
          inline
          label="Ja"
          type="radio"
          id={`f1Ja`}
        />
        <Form.Check
          value={data.funktionsnedsattning}
          checked={!data.funktionsnedsattning}
          onChange={() =>
            dispatch({
              type: "UPDATE",
              name: "funktionsnedsattning",
              value: false
            })
          }
          custom
          inline
          label="Nej"
          type="radio"
          id={`f1Nej`}
        />
        {data.funktionsnedsattning && (
          <Form.Group controlId="funktionsnedsattningDesc">
            <Form.Label required>
              Beskriv de funktionsnedsättningar som har observerats
              (undersökningsfynd). Ange, om möjligt, varaktighet
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              value={data.funktionsnedsattningDesc}
              onChange={e =>
                dispatch({
                  type: "UPDATE",
                  name: "funktionsnedsattningDesc",
                  value: e.target.value
                })
              }
            />
          </Form.Group>
        )}
      </Card>
      <Card className={styles.card}>
        <Card.Header>Utredning och behandling</Card.Header>
        <Card.Text>
          Finns pågående eller planerade utredningar/behandlingar som påverkar
          den planering som Arbetsförmedlingen har beskrivit i förfrågan?
        </Card.Text>
        <Form.Check
          value={data.utredningBehandling}
          checked={data.utredningBehandling}
          onChange={() =>
            dispatch({
              type: "UPDATE",
              name: "utredningBehandling",
              value: true
            })
          }
          custom
          inline
          label="Ja"
          type="radio"
          id={`f2Ja`}
        />
        <Form.Check
          value={data.utredningBehandling}
          checked={!data.utredningBehandling}
          onChange={() =>
            dispatch({
              type: "UPDATE",
              name: "utredningBehandling",
              value: false
            })
          }
          custom
          inline
          label="Nej"
          type="radio"
          id={`f2Nej`}
        />
        {data.utredningBehandling && (
          <Form.Group controlId="utredningBehandlingDesc">
            <Form.Label required>
              Beskriv de funktionsnedsättningar som har observerats
              (undersökningsfynd). Ange, om möjligt, varaktighet
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              value={data.utredningBehandlingDesc}
              onChange={e =>
                dispatch({
                  type: "UPDATE",
                  name: "utredningBehandlingDesc",
                  value: e.target.value
                })
              }
            />
          </Form.Group>
        )}
      </Card>

      <Card className={styles.card}>
        <Card.Header>Arbetets påverkan på sjukdom/skada</Card.Header>
        <Card.Text>
          Kan sjukdomen/skadan förvärras av vissa arbetsuppgifter/arbetsmoment?
        </Card.Text>
        <Form.Check
          value={data.arbetePaverkanSjukdomSkada}
          checked={data.arbetePaverkanSjukdomSkada}
          onChange={() =>
            dispatch({
              type: "UPDATE",
              name: "arbetePaverkanSjukdomSkada",
              value: true
            })
          }
          custom
          inline
          label="Ja"
          type="radio"
          id={`f3Ja`}
        />
        <Form.Check
          value={data.arbetePaverkanSjukdomSkada}
          checked={!data.arbetePaverkanSjukdomSkada}
          onChange={() =>
            dispatch({
              type: "UPDATE",
              name: "arbetePaverkanSjukdomSkada",
              value: false
            })
          }
          custom
          inline
          label="Nej"
          type="radio"
          id={`f3Nej`}
        />
        {data.arbetePaverkanSjukdomSkada && (
          <Form.Group controlId="arbetePaverkanSjukdomSkadaDesc">
            <Form.Label required>
              Beskriv de funktionsnedsättningar som har observerats
              (undersökningsfynd). Ange, om möjligt, varaktighet
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              value={data.arbetePaverkanSjukdomSkadaDesc}
              onChange={e =>
                dispatch({
                  type: "UPDATE",
                  name: "arbetePaverkanSjukdomSkadaDesc",
                  value: e.target.value
                })
              }
            />
          </Form.Group>
        )}
      </Card>

      <Card className={styles.card}>
        <Card.Header>Vårdenhetens adress</Card.Header>

        <label htmlFor="Postadress">Postadress</label>
        <InputGroup className="mb-3">
          <FormControl id="Postadress" aria-describedby="Postadress" />
        </InputGroup>

        <label htmlFor="Postnummer">Postnummer</label>
        <InputGroup className="mb-3">
          <FormControl id="Postnummer" aria-describedby="Postnummer" />
        </InputGroup>

        <label htmlFor="Postort">Postort</label>
        <InputGroup className="mb-3">
          <FormControl id="Postort" aria-describedby="Postort" />
        </InputGroup>

        <label htmlFor="Telefonnummer">Telefonnummer</label>
        <InputGroup className="mb-3">
          <FormControl id="Telefonnummer" aria-describedby="Telefonnummer" />
        </InputGroup>
      </Card>

      <Button>Signera och skicka</Button>
    </div>
  );
}
