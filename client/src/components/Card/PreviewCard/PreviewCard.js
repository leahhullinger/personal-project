import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Thumbnail } from "react-bootstrap";
import TextDetect from "../../TextDetect/TextDetect";

class PreviewCard extends Component {
  render() {
    return (
      <div className="card">
        <Thumbnail className="img" src={this.props.src} alt="171x180" />
        <div className="nav-bar">
          <Button onClick={this.props.onTranscript} />
          <Button onClick={this.props.onClick}>Submit</Button>
        </div>
        <div className="form-container" />
      </div>
    );
  }
}

export default PreviewCard;
