import React, { Component } from "react";
import axios from "axios";

import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";

import Button from "../Button/Button";
const BASE_URL = "http://localhost:3005";

const uploader = new FineUploaderTraditional({
  options: {
    autoUpload: false,
    chunking: {
      enabled: true
    },
    deleteFile: {
      enabled: true,
      endpoint: BASE_URL + "/uploads"
    },
    request: {
      endpoint: BASE_URL + "/uploads"
    },
    retry: {
      enableAuto: true
    },
    onSubmitted: {}
  }
});

const fileInputChildren = (
  <span>
    <button>Select Files</button>
  </span>
);

class FileUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      FilesToUpload: []
    };
  }

  // onFileSelect = (e, files) => {
  //   console.log(this.state.FilesToUpload);
  //   this.setState({ selectedFiles: e.target.files[0] });
  // };

  uploadFiles = () => {
    console.log(this.state.FilesToUpload);
    uploader.methods.uploadStoredFiles();
  };

  render() {
    return (
      <div>
        <Gallery
          dropzone-disabled={true}
          dropzone-content={true}
          fileInput-children={fileInputChildren}
          uploader={uploader}
        />
        <Button name="test submit" onClick={this.uploadFiles}>
          test submit
        </Button>
      </div>
    );
  }
}

export default FileUploader;
