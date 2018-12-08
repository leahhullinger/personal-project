import React, { Component } from "react";
import {connect} from 'react-redux';
import Button from "../../Button/Button";
import "../Card/ImageCard.css";

export default class ImageCard extends Component {
  
  render() {
    return (
      
      <div className="img-preview-card">
        <img className="img-preview" src={} />
        <div className="card-nav-bar">
          <Button>Edit</Button>
          <Button>Save</Button>
        </div>
      </div>
    );
  }
}



export default ImageCard;
