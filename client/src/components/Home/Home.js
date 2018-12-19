import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import styles from "./Home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  onClick = () => {
    axios.get("/auth");
  };
  render() {
    return (
      <div className="home-container">
        {/* <Nav /> */}
        <div className={styles.page}>
          {/* <div className={styles.name}> */}
          <h1 className={styles.h1}>CITIZEN SIDEKICK</h1>
          {/* <p>a short description of what it is.</p> */}
          <a href="http://localhost:3005/auth">sign up</a>
        </div>
      </div>
    );
  }
}

export default Home;
