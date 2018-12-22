import React, { Component } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const AUTHLINK = "http://localhost:3005/auth";

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        {/* <Nav /> */}
        <div className={styles.page}>
          {/* <div className={styles.name}> */}
          <h1 className={styles.h1}>CITIZEN SIDEKICK</h1>
          {/* <p>a short description of what it is.</p> */}
          {/* <a href={AUTHLINK}>Login to dashboard</a> */}
          <a href="http://localhost:3005/auth">Login to dashboard</a>
        </div>
      </div>
    );
  }
}

export default Home;
