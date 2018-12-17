// s3 upload

import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import styles from "./FileSelect.module.css";
import axios from "axios";

import { updateSelectedFiles } from "../../ducks/reducer";

//const StyledDropArea = styled.div - use this for styling dropzone

class FileSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      s3Urls: []
    };
  }

  oncancel = () => {
    this.setState({ files: [] });
  };

  onDrop = files => {
    var file = files[0];
    console.log(files);
    this.props.onUpdateLoading();
    this.props.updateSelectedFiles(file);

    axios
      .post("http://localhost:3005/api/aws", {
        filename: file.name,
        filetype: file.type
      })

      .then(function(result) {
        var signedUrl = result.data;
        var options = {
          headers: {
            "Content-Type": file.type
          }
        };
        return axios.put(signedUrl, file, options);
      })
      .then(res => {
        this.props.setFileUrl(res.config.url, file.name);
      })
      .catch(function(err) {
        console.log(2, err);
      });
  };

  render() {
    const isDropZoneClass = this.props.isDropZone ? styles.dropZone : "";
    const classes = [styles.uploadArea, isDropZoneClass].join(" ");
    return (
      <Dropzone
        className={classes}
        onDrop={this.onDrop}
        onFileDialogCancel={this.onCancel}
      >
        {this.props.isDropZone ? "Drop image here" : "UPLOAD FILE"}
      </Dropzone>
    );
  }
}
function mapStateToProps(state) {
  return {
    filesToUpload: state.filesToUpload
  };
}
export default connect(
  mapStateToProps,
  { updateSelectedFiles }
)(FileSelect);
