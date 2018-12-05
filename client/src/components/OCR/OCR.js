import React, { Component } from "react";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import axios from "axios";
// set up redux
import test from "../OCR/tesseract_test.png";

var Tesseract = window.Tesseract;

export default class OCR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcript: ""
    };
  }

  handleTranscript = () => {
    const testImage = test;
    Tesseract.recognize(testImage)
      .then(result => {
        console.log("result", result.data);
        this.setState({ transcript: result.text });
      })
      .catch(error => console.log("error", error));
  };

  //   axios
  //     .post("http://localhost:3005/api/transcript", this.state.imageURL)
  //     .then(response => {
  //       console.log("text from image:", response.data);
  //       this.setState({ transcript: response.data });
  //     });
  // };
  handleTextEdit = e => {
    this.setState({ transcript: e.target.value });
  };

  render() {
    return (
      <div className="ocr-container">
        <Button onClick={this.handleTranscript}>Transcript</Button>
        <Textarea onChange={this.handleTextEdit}>
          {this.state.transcript}
        </Textarea>
      </div>
    );
  }
}
