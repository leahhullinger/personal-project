import React, { Component } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const AUTHLINK = "http://localhost:3005/auth";

class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.page}>
          <img
            className={styles.img}
            src={
              "https://s3.us-east-2.amazonaws.com/citizen-sidekick/IMG_0146.jpg"
            }
          />
          <span>
            <h1 className={styles.h1}>CITIZEN SIDEKICK</h1>
            <span>
              <a class={styles.link} href="http://localhost:3005/auth">
                LOGIN TO DASHBOARD >
              </a>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Home;
