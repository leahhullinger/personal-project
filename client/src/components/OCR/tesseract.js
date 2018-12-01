import React, { Component } from "react";
import Button from "../Button/Button";
import "./tesseract_test.png";

export default Tesseract.recognize(image)
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
