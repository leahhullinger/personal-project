// template form for newUploadForm, newUserForm
// redux
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Button from "../Button/Button";
import Paper from "../Paper/Paper";
import FileSelect from "../Upload/FileSelect";
import "../Form/Form.css";
import OCR from "../OCR/OCR";

import {
  updateDate,
  updateNotes,
  updateFolder,
  onFormSubmit
} from "../../ducks/reducer";

const BASE_URL = "http://localhost:3005";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileUrl: ""
    };
  }

  onTranscript = () => {
    axios.post(BASE_URL + "/api/transcript").then(response => {
      console.log("text", response.data);
    });
  };
  setFileUrl = url => {
    console.log(url);
    var newUrl = url.substring(0, url.indexOf("?"));
    this.setState({ fileUrl: newUrl });
  };
  onSubmitClick = () => {
    onFormSubmit();
  };

  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    return (
      <div className="form-container">
        <OCR onTranscript={this.onTranscript} />
        <Paper>
          {!this.state.fileUrl ? (
            <div className="dropzone">
              <FileSelect setImageUrl={this.setImageUrl} />
            </div>
          ) : (
            <div>
              <img src={this.state.fileUrl} alt="sidekick img" />
            </div>
          )}
          <span className="divider" />
          <div className="form-inputs-container">
            <select className="folder-select">Select Folder</select>
            <input
              className="form-input"
              placeholder="Date"
              onChange={e => this.props.updateDate(e.target.value)}
            />
            <textarea
              className="form-notes"
              placeholder="Notes"
              onChange={e => this.props.updateNotes(e.target.value)}
            />
          </div>
          <button onClick={() => this.onSubmitClick}>Save</button>
          <div className="main-form-container">
            <img src={this.state.image} />
          </div>
        </Paper>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    filesToUpload: state.filesToUpload,
    date: state.date,
    folder: state.folder,
    notes: state.notes,
    extractedText: state.extractedText,
    folder: state.folder
  };
}
export default connect(
  mapStateToProps,
  {
    updateDate,
    updateNotes,
    onFormSubmit
  }
)(Form);

// styles

/* outlined inputs with label, outline color light version of background color
background is main, buttons dark */
