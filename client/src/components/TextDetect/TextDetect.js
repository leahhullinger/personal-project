import React from "react";
import { Thumbnail, Modal } from "react-bootstrap";
import { Button } from "../Button/Button";
import { Loading } from "../Loading/Loading";
// this is the modal that pops up when tr
// need help connecting image to user_id
import styles from "./TextDetect.module.css";

export const TextDetect = ({
  onUpdateTranscription,
  file,
  isOpen,
  onClose
}) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>Image Transcription</Modal.Header>
      <Modal.Body className={styles.body}>
        <Thumbnail src={file.referenceLink} className={styles.thumb} />
        {!!file.transcription && (
          <textarea
            placeholder="Transription"
            value={file.transcription}
            name="transcription"
            onChange={e => {
              onUpdateTranscription(file.fileName, {
                transcription: e.target.value
              });
            }}
            className={styles.text}
            disabled={!file.transcription}
          />
        )}
        {!file.transcription && <Loading />}
      </Modal.Body>
      <Modal.Footer>
        <Button
          simpleBtn={true}
          onClick={() => {
            onClose();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
