// s3 upload

import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import axios from "axios";

import { onFileSelect } from "../../ducks/reducer";

class FileSelect extends Component {
  constructor(props) {
    super(props);
  }

  _onDrop = files => {
    console.log(files);
    var file = files[0];

    axios
      .post("http://localhost:3005/api/aws", {
        filename: file.name,
        filetype: file.type
      })
      .then(function(result) {
        console.log(result, "signed url result");
        var signedUrl = result.data;
        var options = {
          headers: {
            "Content-Type": file.type
          }
        };

        return axios.put(signedUrl, file, options);
      })
      .then(res => {
        console.log(res);
        this.props.setImageUrl(res.config.url);
      })
      .catch(function(err) {
        console.log(2, err);
      });
  };

  render() {
    return (
      <Dropzone style={{ border: "1px solid gray" }} onDrop={this._onDrop}>
        <div>Click to upload picture!</div>
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
  { onFileSelect }
)(FileSelect);
