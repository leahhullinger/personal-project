import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import UploadButton from "../Upload/UploadButton";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none",
    onChange: this.handleFileSelect()
  }
});

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: []
    };
  }

  handleFileSelect = e => {
    console.log(this.state.files);
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
        <UploadButton />
      </Paper>
    );
  }
}
export default FileUploader;
