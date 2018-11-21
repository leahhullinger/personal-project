// template form for newUploadForm, newUserForm
// redux
import React, { Component } from "react";
import { TextField, Input, InputAdornment } from "@material-ui/core";
import FileUploader from "../Upload/FileUploader";
import Button from "@material-ui/core/Button";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      files: [],
      filetype: "",
      date: "",
      Notes: "",
      TextFromImage: ""
    };
  }
  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    return (
      <div>
        <FileUploader />
        <TextField label="DATE" />
        <TextField label="NOTES" multiline={true} />
        <div className="button-container">
          <Button>Get Text From Image</Button>
          <Button>Submit</Button>
        </div>
      </div>
    );
  }
}

export default Form;
