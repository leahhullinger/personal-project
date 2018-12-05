import React, { Component } from "react";
import OCR from "../OCR/OCR";
import Textarea from "../Textarea/Textarea";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./UploadForm.css";
import Tesseract from "../OCR/Tesseract";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      folder: "",
      date: "",
      notes: "",
      ocrText: ""
    };
  }

  render() {
    return (
      <div className="form-container">
        <div className="previews-window">
          <div className="window">img preview</div>
          <button onClick={this.Tesseract}>get text</button>
        </div>
        <div className="form">
          <select>folder</select>
          <Input placeholder="Date" label={this.placeholder} />
          <Textarea placeholder="Notes" />
        </div>
        <div>
          <button>save</button>
          <button>cancel</button>
        </div>
      </div>
    );
  }
}
