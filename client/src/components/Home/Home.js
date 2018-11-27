import React, { Component } from "react";
import Nav from "../Nav/Nav";
import Carousel from "react-bootstrap";
import Button from "../Button/Button";

class Home extends Component {
  render() {
    return (
      <div className="home-page-container">
        <Nav />
        <div className="home-main-body">
          <div className="description-header">
            <Carousel>Carousel</Carousel>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    );
  }
}
