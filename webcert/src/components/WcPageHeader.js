import React from "react";

import styles from "./WcPageheader.module.scss";
import { formatPersonnr } from "../utils/helpers";
export default function WcPageHeader(props) {
  console.log("WcPageHeader:", props);
  return (
    <>
      <div className={styles.wcPageHeader}>
        <h2>patientuppgifter</h2>
        <h3>
          {props.fornamn} {props.mellannamn} {props.efternamn} -{" "}
          {formatPersonnr(props.personnummer)}
        </h3>
      </div>
      {/* <div className={styles.WcPageHeader}>
        <div className={styles.patientHeaderData}>
          <div className="wc-patient-icon-gutter">
            <div>
              <i className="material-icons gutter-icon icon-wc-32">person</i>
              <h2 className={styles.pageHeading1}>Patientuppgifter</h2>
              <h3 className="page-heading2" id="patientNamn">
                <span ng-if="::hasPrivilege">
                  {props.fornamn} {props.mellannamn} {props.efternamn} -{" "}
                </span>
                {props.personnummer}

                <Button
                  className={styles.patientButton}
                  type="button"
                  ng-click="swapPatientPopOverOpen=false;changePatient()"
                  uib-popover="Byt patient att skriva och söka intyg för."
                  popover-is-open="swapPatientPopOverOpen"
                  popover-popup-delay="300"
                  popover-append-to-body="true"
                  popover-placement="auto top"
                >
                  <i className="material-icons">swap_horiz</i> Byt patient
                </Button>
              </h3>
            </div>

            <wc-sekretess-avliden
              uuid="patientModel.personnummer"
              avliden="patientModel.avliden"
              sekretessmarkering="patientModel.sekretessmarkering"
              testindicator="patientModel.testIndicator"
            ></wc-sekretess-avliden>
          </div>
        </div>
      </div> */}
    </>
  );
}
