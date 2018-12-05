import React, { Component } from "react";
import Button from "../Button/Button";
import "../Card/ImageCard.css";

export default class ImageCard extends Component {
  render() {
    return (
      <div className="img-preview-card">
        <img className="img-preview" />
        <div className="card-nav-bar">
          <Button>Edit</Button>
          <Button>Save</Button>
        </div>
      </div>
    );
  }
}

export default ImageCard;
