import React, { Component } from "react";
import axios from "axios";

import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
import { Button } from "rmwc";
import "react-fine-uploader/gallery/gallery.css";

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

class UploadComponent extends Component {
  uploadFiles = () => {
    uploader.methods.uploadStoredFiles();
  };
  render() {
    return (
      <div>
        <Gallery uploader={uploader} />
        <Button onClick={this.uploadFiles}>test submit</Button>
      </div>
    );
  }
}

export default UploadComponent;
