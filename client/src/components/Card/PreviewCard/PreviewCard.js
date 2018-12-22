import React, { Component } from "react";
import { Thumbnail, Alert } from "react-bootstrap";
import { Button } from "../../Button/Button";
import { TextDetect } from "../../TextDetect/TextDetect";
import { Form } from "../../Form/Form";
import styles from "./PreviewCard.module.css";

class PreviewCard extends Component {
  constructor(props) {
    super(props);
    const { file } = this.props;
    this.state = {
      isFormOpen: false,
      isTranscribeOpen: false,
      notes: file.notes || {
        title: "",
        folder_id: 0,
        date: "",
        text: ""
      }
    };
  }

  onUpdateInput = e =>
    this.setState({
      ...this.state,
      notes: { ...this.state.notes, [e.target.name]: String(e.target.value) }
    });

  render() {
    const { isFormOpen, isTranscribeOpen, notes } = this.state;
    const {
      file,
      onSubmitClick,
      onTranscript,
      onUpdateUpload,
      folders
    } = this.props;
    console.log(this.state.notes);
    return (
      <div className={styles.card}>
        <Thumbnail className="img" src={file.s3_url} alt="upload preview">
          <div className={styles.actions}>
            <Button
              simpleBtn={true}
              onClick={() => this.setState({ isFormOpen: !isFormOpen })}
            >
              + Add Notes
            </Button>
            <Button
              simpleBtn={true}
              onClick={() => {
                !file.transcription && onTranscript(file.filename);
                this.setState({
                  isTranscribeOpen: !isTranscribeOpen
                });
              }}
            >
              Transcribe
            </Button>
            <Button
              simpleBtn={true}
              onClick={() => {
                if (notes.folder_id === 0) {
                  this.setState({ isFormOpen: true });
                }
                if (notes.folder_id !== 0) {
                  onSubmitClick(file.filename);
                }
              }}
            >
              Submit
            </Button>
          </div>
          {isFormOpen && (
            <div className={styles.formWrapper}>
              {notes.folder_id === 0 && (
                <Alert bsStyle="warning">A folder must be selected</Alert>
              )}
              <Form
                notes={notes}
                onUpdateInput={this.onUpdateInput}
                folders={folders}
              />
              <Button
                simpleBtn={true}
                onClick={() => {
                  onUpdateUpload(file.filename, { notes: this.state.notes });
                  this.setState({ isFormOpen: false });
                }}
              >
                Save notes
              </Button>
            </div>
          )}
          <TextDetect
            onUpdateTranscription={onUpdateUpload}
            file={file}
            isOpen={isTranscribeOpen}
            onClose={() => this.setState({ isTranscribeOpen: false })}
          />
        </Thumbnail>
      </div>
    );
  }
}

export default PreviewCard;
