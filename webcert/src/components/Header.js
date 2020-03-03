import React from "react";
import logo from "../Images/webcert_logo.png";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.container}>
      <img src={logo} alt="webcert logo" />
    </header>
  );
}
