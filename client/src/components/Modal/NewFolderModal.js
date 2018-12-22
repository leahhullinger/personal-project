import React, { Component } from "react";
import { Button } from "../Button/Button";
import { NewFolderForm } from "../Form/NewFolder/NewFolder";
import styles from "./NewFolderModal.module.css";

export default class NewFolderModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      folderName: ""
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleInputUpdate = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className={styles.container}>
        <Button className={styles.btn} onClick={this.handleShow}>
          CREATE NEW FOLDER +
        </Button>
        <NewFolderForm
          isOpen={this.state.show}
          handleClose={this.handleClose}
          onClick={() => {
            this.props.onAddFolderClick(this.state.folderName);
            this.handleClose();
          }}
          inputValue={this.state.folderName}
          handleInputUpdate={this.handleInputUpdate}
        />
      </div>
    );
  }
}
