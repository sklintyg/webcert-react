import { generateUUID } from "../utils/helpers";
export class WebcertMock {
  getPatient() {
    const data = {
      fornamn: "TOLVANSSON",
      mellannamn: "TPU",
      efternamn: "TOLVAN",
      personnummer: "191212121212"
    };
    const promise = new Promise(resolve => {
      resolve(data);
    });

    return promise;
  }

  getIntyg() {
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

  createIntyg(code) {
    const intygId = generateUUID();

    const promise = new Promise(resolve => {
      const data = {
        metadata: {
          intygCode: code,
          intygId: intygId
        },
        fields: [
          {
            title: "Funktionsnedsättning",
            name: "funktionsnedsattning",
            type: "radio"
          }
        ]
      };

      resolve(data);
    });

    return promise;
  }
}
