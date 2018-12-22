import React, { Component } from "react";
import styles from "./Modal.module.css";
import { Button } from "../Button/Button";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const {
      isOpen,
      title,
      children,
      btnText,
      style,
      handleShow,
      handleClose,
      onClick,
      onSave
    } = this.props;

    const { show } = this.state.show;
    return (
      <div className={styles.container} onShow={handleShow} close={handleClose}>
        <header className={styles.header}>{title}</header>
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <button
            className={styles.btn}
            onClick={() => {
              onSave();
              handleClose();
            }}
          >
            {btnText}
          </button>
        </footer>
      </div>
    );
  }
}

export const PreviewBox = ({ children, src, url }) => {
  return (
    <div className={styles.previewBox}>
      <img src={url} />
    </div>
  );
};

export const ContentBox = ({ children }) => {
  return <div className={styles.contentBox}>{children}</div>;
};
