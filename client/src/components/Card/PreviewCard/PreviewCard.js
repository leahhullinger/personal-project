import React, { Component } from "react";
import { Thumbnail } from "react-bootstrap";
import { Btn as Button } from "../../Button/Button";
import { TextDetect } from "../../TextDetect/TextDetect";
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
            <Button onClick={() => this.setState({ isFormOpen: !isFormOpen })}>
              + Add Notes
            </Button>
            <Button
              onClick={() => {
                !file.transcription && onTranscript(file.fileName);
                this.setState({
                  isTranscribeOpen: !isTranscribeOpen
                });
              }}
            >
              Transcribe
            </Button>
            <Button onClick={() => onSubmitClick(file)}>Submit</Button>
          </div>
          {isFormOpen && (
            <div className={styles.formWrapper}>
              <span className={styles.row}>
                <label>
                  Add to folder:
                  <select
                    placeholder="Add To Folder:"
                    value={notes.folder || ""}
                    name="folder"
                    onChange={this.onUpdateInput}
                  >
                    <option value="default">default</option>
                  </select>
                </label>

                <label>
                  Add date:
                  <input
                    type="date"
                    name="date"
                    value={notes.date}
                    placeholder="Date"
                    onChange={this.onUpdateInput}
                  />
                </label>
              </span>

              <span className={styles.row}>
                <label>
                  Add notes:
                  <textarea
                    value={notes.text}
                    name="text"
                    onChange={this.onUpdateInput}
                  />
                </label>
              </span>
              <Button
                onClick={() => {
                  onUpdateUpload(file.fileName, { notes: this.state.notes });
                  this.setState({ isFormOpen: false });
                }}
              >
                Save
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
