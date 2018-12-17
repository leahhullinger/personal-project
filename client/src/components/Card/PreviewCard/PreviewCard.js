import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Thumbnail } from "react-bootstrap";
import TextDetect from "../../TextDetect/TextDetect";
import styles from "./PreviewCard.module.css";

class PreviewCard extends Component {
  state = {
    isFormOpen: false,
    folder: "",
    date: "",
    notes: ""
  };

  onUpdateField = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className={styles.card}>
        <Thumbnail className="img" src={this.props.src} alt="upload preview">
          <div className={styles.actions}>
            <Button
              onClick={() =>
                this.setState({ isFormOpen: !this.state.isFormOpen })
              }
            >
              + Add Notes
            </Button>
            <Button onClick={this.props.onTranscript}>Transcribe</Button>
            <Button onClick={this.props.onClick}>Submit</Button>
          </div>
          <div className="form-container" />
          {this.state.isFormOpen && (
            <React.Fragment>
              <div className="form-inputs-container">
                <select
                  placeholder="Add To Folder:"
                  name="folder"
                  onChange={this.onUpdateField}
                />

                <input
                  type="date"
                  name="date"
                  placeholder="Date"
                  onChange={this.onUpdateField}
                />
                <textarea
                  placeholder="Notes"
                  name="notes"
                  onChange={this.onUpdateField}
                />
              </div>
              <button onClick={() => this.props.onSubmitClick(this.props.src)}>
                Save
              </button>
            </React.Fragment>
          )}
        </Thumbnail>
      </div>
    );
  }
}

export default PreviewCard;
