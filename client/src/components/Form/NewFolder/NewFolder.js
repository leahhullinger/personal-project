import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../../Button/Button";
import styles from "./NewFolder.module.css";

export const NewFolderForm = ({
  isOpen,
  handleClose,
  onClick,
  inputValue,
  handleInputUpdate
}) => {
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.heading}>
          Create a new folder.
        </Modal.Title>
        <Modal.Title className={styles.subheading}>
          it makes record keeping much easier.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className={styles.label}>Folder Name </label>
        <input
          name="folderName"
          value={inputValue}
          onChange={handleInputUpdate}
        />
      </Modal.Body>
      <Modal.Footer>
        <span>
          Tip: what event do you need to track? Name your folder that.
        </span>
        <Button onClick={() => onClick()}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
