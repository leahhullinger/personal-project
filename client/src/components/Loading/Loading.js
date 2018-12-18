/** Loading animation original source https://loading.io/css/ */
import React from "react";
import styles from "./Loading.module.css";

export const Loading = ({ message, className }) => {
  const classes = [styles.loadingWrapper, className || null].join(" ");
  return (
    <div className={classes}>
      <div className={styles.ring}>
        <div />
        <div />
        <div />
        <div />
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};
