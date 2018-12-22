import React, { Component } from "react";
import { Button } from "../Button/Button";
import { NewFolderForm } from "../Form/NewFolder/NewFolder";

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
      <div style={{ flex: 1, padding: "10px" }}>
        <Button style={{ width: "100%" }} onClick={this.handleShow}>
          Create New Folder +
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
