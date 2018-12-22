import React from "react";
import styles from "./Button.module.css";

export const Button = ({ children, simpleBtn = false, onClick, hoverBtn }) => {
  return (
    <button
      className={simpleBtn ? styles.simpleBtn : styles.btn}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
