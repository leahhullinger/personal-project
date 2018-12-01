// template form for newUploadForm, newUserForm
// redux
import React, { Component } from "react";
import FileUploader from "../Upload/FileUploader";
import Button from "../Button/Button";
import Paper from "../Paper/Paper";
import FileSelect from "../Upload/FileSelect";
import ImageCard from "../Card/ImageCard";
import tesseract_test from "../OCR/tesseract_test.png";
import "../Form/Form.css";

var Tesseract = window.Tesseract;

const classes = {
  backgroundColor: "#ff3d00",
  margin: "30px"
};
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
      date: "",
      folder: null,
      notes: "",
      text: ""
    };
  }

  setFileUrl = url => {
    const newUrl = url.substring(0, url.indexOf("?"));
    this.setState({ imageUrl: newUrl });
  };

  handleTextExtract = () => {
    const { image } = this.state;

    Tesseract.recognize(image)
      .progress(p => {
        console.log("progress", p);
      })
      .then(result => {
        console.log("result", result);
        this.setState({ text: result.text });
      })
      .finally(resultOrError => {
        console.log(resultOrError);
      });
  };
  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    return (
      <div className="form-container">
        <Paper>
          {!this.state.imageURL ? (
            <div className="dropzone">
              <FileSelect setImageUrl={this.setFileUrl} />
            </div>
          ) : (
            <div>
              <img src={this.state.imageURL} alt="image" />
            </div>
          )}
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
