// template card for image, audio, notes, preview, display

import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div className="Card">
        <h1>File Name</h1>
        <div>Date</div>
        <div>File Description</div>
      </div>
    );
  }
}
