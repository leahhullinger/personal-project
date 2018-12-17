// template card for image, audio, notes, preview, display

import React, { Component } from "react";
import styles from "./FileCard.module.css";

export default class FileCard extends Component {
  render() {
    return (
      <div className={styles.card}>
        <img className={styles.img} src={this.props.src} />
        <div>
          <div>
            Date
            {this.props.date}
          </div>
          <div name="notes">Notes{this.props.notes}</div>
        </div>
      </div>
    );
  }
}
