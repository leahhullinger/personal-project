import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.css";
// import { Typography } from "@material-ui/core";
// const styles = withStyles({
//   pallette: {
//     primary: "#e0f2f1",
//     secondary: "#ff3d00"
//   }
// });

class Home extends Component {
  constructor(props) {
    super(props);
  }
  onClick = () => {
    axios.get("/auth");
  };
  render() {
    return (
      <div className="home-page-container">
        <div className="top-left">
          <h1>CITIZEN SIDEKICK</h1>
        </div>
        <a href="http://localhost:3005/login">Login</a>
        <div className="top-right" />
      </div>
    );
  }
}

export default Home;
