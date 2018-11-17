// EVENT FORM
import React, { Component } from "react";
import axios from "axios";
import FineUploader from "../Upload/FineUploader";
// used for both NEW EVENT and EDIT EVENT

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFiles: []
    };
  }
  handleFileSelect = e => {
    this.setState({ uploadedFiles: e.target.files });
  };

  onUploadSubmit() {
    console.log("submitted");
  }

  readFile = (file, callback = () => {}) => {
    if (file) {
      const reader = new FileReader();
      const image = new Image();

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.setState({
          dragging: false,
          imageSource: file.type.match("image*") ? reader.result : null
        });

        image.src = reader.result;

        image.onload = () => {
          callback({
            file,
            width: image.width,
            height: image.height
          });
        };
      };
    }
  };

  render() {
    return (
      <div className="new-post-form">
        <FineUploader />
        <div>
          <input
            multiple
            name="files"
            type="file"
            onChange={this.handleFileSelect}
          />
          <img />
        </div>
        <textarea />
        <button onClick={() => this.onUploadSubmit()}>upload</button>

        {/* {this.state.uploadedFiles.length > 0
          ? console.log(this.state.uploadedFiles[0].name)
          : null} */}
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
