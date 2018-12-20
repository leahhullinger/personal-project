import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, simpleBtn, onClick }) => {
  return (
    <button
      className={simpleBtn ? styles.simpleBtn : styles.btn}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
