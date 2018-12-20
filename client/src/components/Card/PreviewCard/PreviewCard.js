import React, { Component } from "react";
import { Thumbnail } from "react-bootstrap";
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
        folder: "",
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
    const { file, onSubmitClick, onTranscript, onUpdateUpload } = this.props;

    return (
      <div className={styles.card}>
        <Thumbnail
          className="img"
          src={file.referenceLink}
          alt="upload preview"
        >
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
                !file.transcription && onTranscript(file.fileName);
                this.setState({
                  isTranscribeOpen: !isTranscribeOpen
                });
              }}
            >
              Transcribe
            </Button>
            <Button simpleBtn={true} onClick={() => onSubmitClick(file)}>
              Submit
            </Button>
          </div>
          {isFormOpen && (
            <div className={styles.formWrapper}>
              <Form notes={notes} onUpdateInput={this.onUpdateInput} />
              <Button
                simpleBtn={true}
                onClick={() => {
                  onUpdateUpload(file.fileName, { notes: this.state.notes });
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
