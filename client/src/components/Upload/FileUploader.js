import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import UploadButton from "../Upload/UploadButton";

const styles = {
  input: {
    display: "none"
  }
};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: []
    };
  }

  handleFileSelect = e => {
    console.log(FileList);
    this.setState({ files: e.target.files[0] });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleSave = files => {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  render() {
    return (
      <Paper>
        <UploadButton handleFileSelect={this.handleFileSelect} />
      </Paper>
    );
  }
}

export default FileUpload;
