import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "../../Button/Button";
import styles from "./NewFolder.module.css";

const BASE_URL = "http://localhost:3005";

export default class NewFolderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <button className={styles.btn} onClick={this.handleShow}>
          Create New Folder
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.heading}>
              Create a new folder.
            </Modal.Title>
            <Modal.Title className={styles.subheading}>
              it makes record keeping much easier.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className={styles.label}>Folder Name </label>
            <input name="folderName" onChange={e => this.props.onChange(e)} />
          </Modal.Body>
          <Modal.Footer>
            <span>
              Tip: what event do you need to track? Name your folder that.
            </span>
            <Button onClick={() => this.props.onAdd()}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
