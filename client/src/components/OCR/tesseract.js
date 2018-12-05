import React from "react";
import Button from "../Button/Button";

var Tesseract = window.Tesseract;

export default function textTransform() {
  Tesseract.recognize()
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
}
