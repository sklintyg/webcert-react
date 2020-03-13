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

  createCertificate(certificateCode) {
    const certificateId = generateUUID();

    const promise = new Promise(resolve => {
      const data = {
        metadata: {
          certificateCode,
          certificateId
        },
        fields: [
          {
            title: "Funktionsnedsättning",
            name: "funktionsnedsattning",
            type: "CHECKBOX",
            header: "Funktionsnedsättning",
            label: "Ja",
            text:
              "Finns besvär på grund av sjukdom eller skada som medför funktionsnedsättning?",
            defaultValue: false
          }
        ],
        data: {
          funktionsnedsattning: false,
          funktionsnedsattningDesc: "",
          utredningBehandling: false,
          utredningBehandlingDesc: "",
          arbetePaverkanSjukdomSkada: false,
          arbetePaverkanSjukdomSkadaDesc: ""
        }
      };

      resolve(data);
    });

    return promise;
  }
}
