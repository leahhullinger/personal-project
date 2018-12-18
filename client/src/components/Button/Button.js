import React from "react";
import { Button } from "react-bootstrap";
import styles from "./Button.module.css";

export const Btn = ({ children, ...rest }) => {
  return (
    <Button className={styles.btn} {...rest}>
      {children}
    </Button>
  );
};
