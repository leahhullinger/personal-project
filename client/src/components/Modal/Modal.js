import React from "react";
import styles from "./Modal.module.css";

export const Modal = ({ title, children, button }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>{title}</header>
      <div className={styles.body}>{children}</div>
      <footer className={styles.footer}>{button}</footer>
    </div>
  );
};
