import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, simpleBtn = false, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};
