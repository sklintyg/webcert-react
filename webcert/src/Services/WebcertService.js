import { generateUUID } from "../utils/helpers/generateUUID";
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

  getCertificate() {
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

  createCertificate(code) {
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
