// template card for image, audio, notes, preview, display

import React, { Component } from "react";
import styles from "./FileCard.module.css";
import Modal, { PreviewBox, ContentBox } from "../../Modal/Modal";
import { Thumbnail } from "react-bootstrap";

export default class FileCard extends Component {
  render() {
    const { date, title, notes, text, s3_url, file } = this.props.file;
    console.log(this.props);
    return (
      <div className={styles.card}>
        {/* <img src={s3_url} /> */}
        <div className={styles.contentBox}>
          <h3>{this.props.title}</h3>
          <p>{this.props.date}</p>
          <span className={styles.wrapper}>
            <h4>Notes</h4>
            <p>{this.props.notes}</p>
          </span>
          <span>
            <h4>Text</h4>
            <p>{this.props.text}</p>
          </span>
        </div>
        <span />
      </div>
    );
  }
}
