import { generateUUID } from "../utils/helpers";
export class WebcertMock {
  getPatient() {
    const data = {
      firstName: "TOLVANSSON",
      middleName: "TPU",
      lastName: "TOLVAN",
      ssn: "191212121212"
    };
    const promise = new Promise(resolve => {
      resolve(data);
    });

    return promise;
  }

  getCertificates() {
    const data = [
      {
        name: "Arbetsförmedlingens medicinska utlåtande",
        code: "AF00213",
        isFavorite: false
      },
      {
        name: "Läkarintyg för sjukpenning",
        code: "FK7804",
        isFavorite: true
      },
      {
        name: "Dödsbevis",
        code: null,
        isFavorite: false
      },
      {
        name: "Läkares anmälan till Transportstyrelsen",
        code: "TSTRK1009",
        isFavorite: false
      }
    ];

    const promise = new Promise(resolve => {
      resolve(data);
    });

    return promise;
  }

  getCurrentCertificates() {
    const webcertData = localStorage.getItem("webcert");
    const promise = new Promise((resolve, reject) => {
      const webcert = webcertData ? JSON.parse(webcertData) : { data: [] };
      resolve(webcert);
    });

    return promise;
  }
  createCertificate(certificateCode) {
    const certificateId = generateUUID();

    const promise = new Promise(resolve => {
      const data = _getData(certificateCode, certificateId);

      resolve(data);
    });

    return promise;
  }

  createDynamicCertificate(certificateCode) {
    const certificateId = generateUUID();

    const promise = new Promise(resolve => {
      const data = _getData(certificateCode, certificateId);

      resolve(data);
    });

    return promise;
  }

  createOneLevelData(certificateCode) {
    const data = {
      metadata: {
        certificateCode: "af00213",
        certificateId: "bed26d3e-7112-4f08-98bf-01be40e26c80",
        certificateName: "Arbetsförmedlingens medicinska utlåtande"
      },
      categories: [
        {
          id: "funktionsnedsattning",
          parent: null,
          config: {
            text: "Funktionsnedsättning",
            description: null,
            component: "category"
          }
        },
        {
          id: "1",
          parent: "funktionsnedsattning",
          config: {
            text:
              "Finns besvär på grund av sjukdom eller skada som medför funktionsnedsättning?",
            description: "",
            component: "ue-radio"
          },
          data: {
            harFunktionsnedsattning: null
          },
          validation: {
            required: true,
            requiredProp: "harFunktionsnedsattning"
          }
        },
        {
          id: "1.1",
          parent: "1",
          config: {
            text:
              "Beskriv de funktionsnedsättningar som har observerats (undersökningsfynd). Ange, om möjligt, varaktighet.",
            description: "",
            component: "ue-textarea"
          },
          data: {
            funktionsnedsattning: null
          },
          validation: {
            required: true,
            requiredProp: "funktionsnedsattning",
            hideExpression: "!harFunktionsnedsattning"
          }
        },
        {
          id: "aktivitetsbegransning",
          parent: null,
          config: {
            text: "Aktivitetsbegränsning",
            description: null,
            component: "category"
          },
          validation: {
            hideExpression: "!model.harFunktionsnedsattning"
          }
        },
        {
          id: "2",
          parent: "aktivitetsbegransning",
          config: {
            text:
              "Leder funktionsnedsättningarna till aktivitetsbegränsningar i relation till arbete eller studier?",
            description: "",
            component: "ue-radio"
          },
          data: {
            harAktivitetsbegransning: null
          },
          validation: {
            required: true,
            requiredProp: "harAktivitetsbegransning"
          }
        },
        {
          id: "2.1",
          parent: "2",
          config: {
            text:
              "Ange vilka aktivitetsbegränsningar? Ange hur och om möjligt varaktighet/prognos.",
            description: "",
            component: "ue-textarea"
          },
          data: {
            aktivitetsbegransning: null
          },
          validation: {
            required: true,
            requiredProp: "aktivitetsbegransning",
            hideExpression: "!harAktivitetsbegransning"
          }
        },
        {
          id: "utredningBehandling",
          parent: null,
          config: {
            text: "Utredning och behandling",
            description: null,
            component: "category"
          },
          validation: {
            hideExpression: null
          }
        },
        {
          id: "3",
          parent: "utredningBehandling",
          config: {
            text:
              "Finns pågående eller planerade utredningar/behandlingar som påverkar den planering som Arbetsförmedlingen har beskrivit i förfrågan?",
            description: "",
            component: "ue-radio"
          },
          data: {
            harUtredningBehandling: null
          },
          validation: {
            required: true,
            requiredProp: "harUtredningBehandling"
          }
        },
        {
          id: "3.1",
          parent: "3",
          config: {
            text:
              "Hur påverkar utredningarna/behandlingarna planeringen? När planeras utredningarna/behandlingarna att vara avslutade?\n",
            description: "",
            component: "ue-textarea"
          },
          data: {
            utredningBehandling: null
          },
          validation: {
            required: true,
            requiredProp: "utredningBehandling",
            hideExpression: "!harUtredningBehandling"
          }
        },
        {
          id: "arbetetsPaverkan",
          parent: null,
          config: {
            text: "Arbetets påverkan på sjukdom/skada",
            description: null,
            component: "category"
          },
          validation: {
            hideExpression: null
          }
        },
        {
          id: "4",
          parent: "arbetetsPaverkan",
          config: {
            text:
              "Kan sjukdomen/skadan förvärras av vissa arbetsuppgifter/arbetsmoment?",
            description: "",
            component: "ue-radio"
          },
          data: {
            harArbetetsPaverkan: null
          },
          validation: {
            required: true,
            requiredProp: "harArbetetsPaverkan"
          }
        },
        {
          id: "4.1",
          parent: "4",
          config: {
            text: "Vilken typ av arbetsuppgifter/arbetsmoment?",
            description: "",
            component: "ue-textarea"
          },
          data: {
            arbetetsPaverkan: null
          },
          validation: {
            required: true,
            requiredProp: "arbetetsPaverkan",
            hideExpression: "!harArbetetsPaverkan"
          }
        },
        {
          id: "ovrigt",
          config: {
            text: "Övrigt",
            description: null,
            component: "category"
          },
          validation: {
            hideExpression: null
          }
        },
        {
          id: "5",
          parent: "ovrigt",
          config: {
            text: "Övrigt som Arbetsförmedlingen bör känna till?",
            description: "",
            component: "ue-textarea"
          },
          data: {
            ovrigt: null
          },
          validation: {
            required: false
          }
        }
      ]
    };

    return Promise.resolve(data);
  }

  saveData(id, data, metadata) {
    debugger;
    const webcertData = localStorage.getItem("webcert");
    const webcert = webcertData ? JSON.parse(webcertData) : { data: [] };
    const hasData = webcert.data.filter(item => item.id === id);

    if (hasData.length > 0) {
    } else {
      webcert.data.push({ id, data, metadata });
    }

    const promise = new Promise((resolve, reject) => {
      localStorage.setItem("webcert", JSON.stringify(webcert));
      resolve();
    });

    return promise;
  }
}

function _getData(certificateCode, certificateId) {
  let data = {
    metadata: {
      certificateCode,
      certificateId
    }
  };
  switch (certificateCode) {
    case "AF00213":
      data = {
        metadata: {
          certificateCode,
          certificateId,
          certificateName: "Arbetsförmedlingens medicinska utlåtande"
        },
        sections: [
          {
            type: "YES_NO_COMMENT",
            header: "Funktionsnedsättning",
            required: true,
            text:
              "Finns besvär på grund av sjukdom eller skada som medför funktionsnedsättning?",
            questionProp: "funktionsnedsattning",
            descriptionProp: "funktionsnedsattningDesc",
            descriptionLabel:
              "Beskriv de funktionsnedsättningar som har observerats (undersökningsfynd). Ange, om möjligt, varaktighet. "
          },
          {
            type: "YES_NO_COMMENT",
            required: true,
            header: "Aktivitetsbegränsning",
            text:
              "Leder funktionsnedsättningarna till aktivitetsbegränsningar i relation till arbete eller studier?",
            questionProp: "aktivitetsbegransningar",
            descriptionLabel:
              "Ange vilka aktivitetsbegränsningar? Ange hur och om möjligt varaktighet/prognos.",
            descriptionProp: "aktivitetsbegransningarDesc"
          },
          {
            type: "YES_NO_COMMENT",
            required: true,
            header: "Utredning och behandling",
            text:
              "Finns pågående eller planerade utredningar/behandlingar som påverkar den planering som Arbetsförmedlingen har beskrivit i förfrågan?",
            questionProp: "utredningBehandling",
            descriptionProp: "utredningBehandlingDesc",
            descriptionLabel:
              "Hur påverkar utredningarna/behandlingarna planeringen? När planeras utredningarna/behandlingarna att vara avslutade?"
          },
          {
            type: "YES_NO_COMMENT",
            header: "Arbetets påverkan på sjukdom/skada",
            text:
              "Kan sjukdomen/skadan förvärras av vissa arbetsuppgifter/arbetsmoment?",
            questionProp: "arbetePaverkanSjukdomSkada",
            descriptionProp: "arbetePaverkanSjukdomSkadaDesc",
            descriptionLabel: "Vilken typ av arbetsuppgifter/arbetsmoment?"
          }
        ],
        data: {
          funktionsnedsattning: false,
          funktionsnedsattningDesc: "",
          aktivitetsbegransningar: false,
          aktivitetsbegransningarDesc: "",
          utredningBehandling: false,
          utredningBehandlingDesc: "",
          arbetePaverkanSjukdomSkada: false,
          arbetePaverkanSjukdomSkadaDesc: ""
        }
      };
      return data;
    case "FK7804":
      data = {
        data: {
          funktionsnedsattning: false,
          funktionsnedsattningDesc: "",
          utredningBehandling: false,
          utredningBehandlingDesc: "",
          arbetePaverkanSjukdomSkada: false,
          arbetePaverkanSjukdomSkadaDesc: ""
        }
      };
      debugger;
      return data;
    default:
      return data;
  }
}
