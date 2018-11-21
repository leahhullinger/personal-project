// EVENT FORM
import React, { Component } from "react";
import axios from "axios";
import FineUploader from "../Upload/FineUploader";
import FileUploader from "../Upload/FileUploader";
// used for both NEW EVENT and EDIT EVENT
import UploadButton from "../Button/Button";

class NewEventForm extends Component {
  render() {
    return (
      <div>
        NewEventForm
        <FineUploader />
        <FileUploader />
      </div>
    );
  }
}

export default NewEventForm;

/*
inputs
- date  date of upload or date of event?
- notes about event
- url

FileUploader



buttons
- upload
- submit

other
- preview window
*/
