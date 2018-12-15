// s3 upload

import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import "../../styles.css";
import axios from "axios";

import { updateSelectedFiles } from "../../ducks/reducer";

//const StyledDropArea = styled.div - use this for styling dropzone

class FileSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [],
      fileUrls: []
    };
  }

  onFileSelect = e => {
    console.log(e.target.files);
    files = e.target.files;
    updateSelectedFiles(files);
  };

  _onDrop = files => {
    var file = files[0];
  };

  onUpload = file => {
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
        this.props.setFileUrl(res.config.url);
      })
      .catch(function(err) {
        console.log(2, err);
      });
  };

  render() {
    return (
      <Dropzone
        style={{
          border: "1px solid #f0f0f0",
          borderRadius: "5px",
          fontSize: "10px",
          fontFamily: "Noto Sans SC, sans-serif",
          padding: "10px",
          minHeight: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onDrop={this._onDrop}
      >
        {" "}
        UPLOAD FILE
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
