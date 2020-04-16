import React, { lazy, Suspense, useReducer, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import styles from "./Certificates.module.scss";

import { WebcertMock } from "../../Services/WebcertService";

import { UeRadio } from "../shared/UeRadio";

const UeDetails = lazy(() => import("../shared/UeDetails"));

const INIT_STATE = {
  metadata: {
    certificateCode: "af00213",
    certificateId: "bed26d3e-7112-4f08-98bf-01be40e26c80",
    certificateName: "Arbetsförmedlingens medicinska utlåtande",
  },
  categories: {
    funktionsnedsattningCategory: {
      id: "funktionsnedsattning",
      parent: null,
      config: {
        text: "Funktionsnedsättning",
        description: null,
        component: "category",
      },
    },
    funktionsnedsattning: {
      id: "1",
      parent: "funktionsnedsattning",
      config: {
        text:
          "Finns besvär på grund av sjukdom eller skada som medför funktionsnedsättning?",
        description: "",
        component: "ue-radio",
      },
      data: {
        harFunktionsnedsattning: null,
      },
      validation: {
        required: true,
        requiredProp: "harFunktionsnedsattning",
      },
    },
    harFunktionsnedsattning: {
      id: "1.1",
      parent: "1",
      config: {
        text:
          "Beskriv de funktionsnedsättningar som har observerats (undersökningsfynd). Ange, om möjligt, varaktighet.",
        description: "",
        component: "ue-textarea",
      },
      data: {
        funktionsnedsattning: null,
      },
      validation: {
        required: true,
        requiredProp: "funktionsnedsattning",
        hideExpression: "!harFunktionsnedsattning",
      },
    },
    aktivitetsbegransningCategory: {
      id: "aktivitetsbegransning",
      parent: null,
      config: {
        text: "Aktivitetsbegränsning",
        description: null,
        component: "category",
      },
      validation: {
        hideExpression: "!model.harFunktionsnedsattning",
      },
    },
    aktivitetsbegransning: {
      id: "2",
      parent: "aktivitetsbegransning",
      config: {
        text:
          "Leder funktionsnedsättningarna till aktivitetsbegränsningar i relation till arbete eller studier?",
        description: "",
        component: "ue-radio",
      },
      data: {
        harAktivitetsbegransning: null,
      },
      validation: {
        required: true,
        requiredProp: "harAktivitetsbegransning",
      },
    },
    harAktivitetsbegransning: {
      id: "2.1",
      parent: "2",
      config: {
        text:
          "Ange vilka aktivitetsbegränsningar? Ange hur och om möjligt varaktighet/prognos.",
        description: "",
        component: "ue-textarea",
      },
      data: {
        aktivitetsbegransning: null,
      },
      validation: {
        required: true,
        requiredProp: "aktivitetsbegransning",
        hideExpression: "!harAktivitetsbegransning",
      },
    },
    utredningBehandlingCategory: {
      id: "utredningBehandling",
      parent: null,
      config: {
        text: "Utredning och behandling",
        description: null,
        component: "category",
      },
      validation: {
        hideExpression: null,
      },
    },
    utredningBehandling: {
      id: "3",
      parent: "utredningBehandling",
      config: {
        text:
          "Finns pågående eller planerade utredningar/behandlingar som påverkar den planering som Arbetsförmedlingen har beskrivit i förfrågan?",
        description: "",
        component: "ue-radio",
      },
      data: {
        harUtredningBehandling: null,
      },
      validation: {
        required: true,
        requiredProp: "harUtredningBehandling",
      },
    },
    harUtredningBehandling: {
      id: "3.1",
      parent: "3",
      config: {
        text:
          "Hur påverkar utredningarna/behandlingarna planeringen? När planeras utredningarna/behandlingarna att vara avslutade?\n",
        description: "",
        component: "ue-textarea",
      },
      data: {
        utredningBehandling: null,
      },
      validation: {
        required: true,
        requiredProp: "utredningBehandling",
        hideExpression: "!harUtredningBehandling",
      },
    },
    arbetetsPaverkanCategory: {
      id: "arbetetsPaverkan",
      parent: null,
      config: {
        text: "Arbetets påverkan på sjukdom/skada",
        description: null,
        component: "category",
      },
      validation: {
        hideExpression: null,
      },
    },
    arbetetsPaverkan: {
      id: "4",
      parent: "arbetetsPaverkan",
      config: {
        text:
          "Kan sjukdomen/skadan förvärras av vissa arbetsuppgifter/arbetsmoment?",
        description: "",
        component: "ue-radio",
      },
      data: {
        harArbetetsPaverkan: null,
      },
      validation: {
        required: true,
        requiredProp: "harArbetetsPaverkan",
      },
    },
    harArbetetsPaverkan: {
      id: "4.1",
      parent: "4",
      config: {
        text: "Vilken typ av arbetsuppgifter/arbetsmoment?",
        description: "",
        component: "ue-textarea",
      },
      data: {
        arbetetsPaverkan: null,
      },
      validation: {
        required: true,
        requiredProp: "arbetetsPaverkan",
        hideExpression: "!harArbetetsPaverkan",
      },
    },
    ovrigtCategory: {
      id: "ovrigt",
      config: {
        text: "Övrigt",
        description: null,
        component: "category",
      },
      validation: {
        hideExpression: null,
      },
    },
    ovrigt: {
      id: "5",
      parent: "ovrigt",
      config: {
        text: "Övrigt som Arbetsförmedlingen bör känna till?",
        description: "",
        component: "ue-textarea",
      },
      data: {
        ovrigt: null,
      },
      validation: {
        required: false,
      },
    },
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "LOAD_DATA":
      return { ...state, ...action.certificate };
    case "UPDATE":
      let categories = state.categories ? state.categories : {};
      categories[action.prop].data[action.name] = action.value;

      return { ...state, categories };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
export default function Af00213() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const { categories, metadata } = state;

  const webcertService = new WebcertMock();

  useEffect(() => {
    function loadCertficiateData() {
      webcertService.getOneLevelData().then((response) => {
        console.log("response:", response);
        dispatch({
          type: "LOAD_DATA",
          categories: response.categories,
          metadata: response.metadata,
        });
      });
    }

    loadCertficiateData();
  }, []);

  return (
    <div>
      <Card className={styles.card}>
        <Card.Header>
          {state?.categories?.funktionsnedsattningCategory?.config?.text}
        </Card.Header>
        <Card.Text>
          {state?.categories?.funktionsnedsattning?.config?.text}
        </Card.Text>

        <UeRadio
          name="funktionsnedsattning"
          value={
            state?.categories?.funktionsnedsattning.data.harFunktionsnedsattning
          }
          update={(value) =>
            dispatch({
              type: "UPDATE",
              prop: "funktionsnedsattning",
              name: "harFunktionsnedsattning",
              value,
            })
          }
        />

        {state?.categories?.funktionsnedsattning.data
          ?.harFunktionsnedsattning === "ja" && (
          <Suspense fallback={<p>Laddar...</p>}>
            <UeDetails
              label={state?.categories?.harFunktionsnedsattning?.config?.text}
              update={(value) =>
                dispatch({
                  type: "UPDATE",
                  name: "harFunktionsnedsattning",
                  prop: "funktionsnedsattning",
                  value,
                })
              }
            />
          </Suspense>
        )}
      </Card>

      {/* aktivitetsbegransningCategory */}
      {state?.categories?.funktionsnedsattning.data.harFunktionsnedsattning ===
        "ja" && (
        <Card className={styles.card}>
          <Card.Header>
            {state?.categories?.aktivitetsbegransningCategory?.config?.text}
          </Card.Header>
          <Card.Text>
            {state?.categories?.aktivitetsbegransning?.config?.text}
          </Card.Text>

          <UeRadio
            name="aktivitetsbegransning"
            value={
              state?.categories?.aktivitetsbegransning.data
                ?.harAktivitetsbegransning
            }
            update={(value) =>
              dispatch({
                type: "UPDATE",
                prop: "aktivitetsbegransning",
                name: "harAktivitetsbegransning",
                value,
              })
            }
          />

          {state?.categories?.aktivitetsbegransning.data
            ?.harAktivitetsbegransning === "ja" && (
            <Suspense fallback={<p>Laddar...</p>}>
              <UeDetails
                label={
                  state?.categories?.harAktivitetsbegransning?.config?.text
                }
                update={(value) =>
                  dispatch({
                    type: "UPDATE",
                    name: "harAktivitetsbegransning",
                    prop: "aktivitetsbegransning",
                    value,
                  })
                }
              />
            </Suspense>
          )}
        </Card>
      )}

      <Card className={styles.card}>
        <Card.Header>
          {state?.categories?.utredningBehandlingCategory.config.text}
        </Card.Header>
        <Card.Text>
          {state?.categories?.utredningBehandling.config.text}
        </Card.Text>
        <UeRadio
          name="harUtredningBehandling"
          value={
            state?.categories?.utredningBehandling.data.harUtredningBehandling
          }
          update={(value) =>
            dispatch({
              type: "UPDATE",
              prop: "utredningBehandling",
              name: "harUtredningBehandling",
              value,
            })
          }
        />

        {state?.categories?.utredningBehandling.data.harUtredningBehandling ===
          "ja" && (
          <Suspense fallback={<p>Laddar...</p>}>
            <UeDetails
              label={state?.categories?.harUtredningBehandling?.config?.text}
              value={
                state?.categories?.harUtredningBehandling?.data
                  ?.utredningBehandling
              }
              update={(value) =>
                dispatch({
                  type: "UPDATE",
                  name: "harUtredningBehandling",
                  prop: "utredningBehandling",
                  value,
                })
              }
            />
          </Suspense>
        )}
      </Card>

      <Card className={styles.card}>
        <Card.Header>
          {state?.categories?.arbetetsPaverkanCategory?.config.text}
        </Card.Header>
        <Card.Text>
          {state?.categories?.arbetetsPaverkan?.config.text}
        </Card.Text>

        <UeRadio
          name="hararbetsPaverkan"
          value={state.categories.arbetetsPaverkan.data.harArbetetsPaverkan}
          update={(value) =>
            dispatch({
              type: "UPDATE",
              prop: "arbetetsPaverkan",
              name: "harArbetetsPaverkan",
              value,
            })
          }
        />

        {state.categories.arbetetsPaverkan.data.harArbetetsPaverkan ===
          "ja" && (
          <UeDetails
            label="Vilken typ av arbetsuppgifter/arbetsmoment?"
            value={
              state?.categories?.harArbetetsPaverkan?.data?.arbetetsPaverkan
            }
            update={(value) =>
              dispatch({
                type: "UPDATE",
                prop: "harArbetetsPaverkan",
                name: "arbetetsPaverkan",
                value,
              })
            }
          />
        )}
      </Card>
      <Card className={styles.card}>
        <Card.Header>
          {state?.categories.ovrigtCategory.config.text}
        </Card.Header>

        <Suspense fallback={<p>Laddar...</p>}>
          <UeDetails
            label={state.categories.ovrigt.config.text}
            value={state.categories.ovrigt.data.ovrigt}
            update={(value) =>
              dispatch({
                type: "UPDATE",
                prop: "ovrigt",
                name: "ovrigt",
                value,
              })
            }
          />
        </Suspense>
      </Card>
      <Button>Signera och skicka</Button>
    </div>
  );
}
