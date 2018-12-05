// template form for newUploadForm, newUserForm
// redux
import React, { Component } from "react";
import FileUploader from "../Upload/FileUploader";
import Button from "../Button/Button";
import Paper from "../Paper/Paper";
import FileSelect from "../Upload/FileSelect";
import "../Form/Form.css";
import OCR from "../OCR/OCR";

const classes = {
  backgroundColor: "#ff3d00",
  margin: "30px"
};
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileUrl: "",
      date: "",
      folder: null,
      notes: "",
      url: "",
      text: ""
    };
  }

  setFileUrl = url => {
    console.log(url);
    var newUrl = url.substring(0, url.indexOf("?"));
    this.setState({ fileUrl: newUrl });
  };

  // handleTextExtract = () => {
  //   const { image } = this.state;

  //   Tesseract.recognize(image)
  //     .progress(p => {
  //       console.log("progress", p);
  //     })
  //     .then(result => {
  //       console.log("result", result);
  //       this.setState({ text: result.text });
  //     })
  //     .finally(resultOrError => {
  //       console.log(resultOrError);
  //     });
  // };
  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    return (
      <div className="form-container">
        <Paper>
          {!this.state.fileUrl} ?
          <div className="dropzone">
            <FileSelect setFileUrl={this.setFileUrl} />
            :
            <img src={this.state.fileUrl} alt="upload img" />
          </div>
          }
          <span className="divider" />
          <div className="form-inputs-container">
            <select className="folder-select">Select Folder</select>
            <input className="form-input" placeholder="Date" />
            <textarea className="form-notes" placeholder="Notes" />
          </div>
          <Button variant="contained">Save</Button>
          <div className="main-form-container">
            <img src={this.state.image} />
            <Button onClick={this.handleTextExtract}>Extract Text</Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Form;

// styles

/* outlined inputs with label, outline color light version of background color
background is main, buttons dark */
