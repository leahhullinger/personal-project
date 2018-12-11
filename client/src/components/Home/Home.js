import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles.css";
import "../Home/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  onClick = () => {
    axios.get("/auth");
  };
  render() {
    return (
      <div className="home">
        <div className="page">
          <h1 className="name">CITIZEN SIDEKICK</h1>
          <a href="http://localhost:3005/auth">login</a>
        </div>
      </div>
    );
  }
}

export default Home;
