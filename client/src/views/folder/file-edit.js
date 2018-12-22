import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";

export const EditFileForm = ({
  isOpen,
  handleClose,
  onClick,
  notes,
  onUpdateInput
}) => {
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit your file</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form notes={notes} onUpdateInput={onUpdateInput} isEdit={true} />
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
