import React, { Component } from "react";
import axios from "axios";

import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
import "react-fine-uploader/gallery/gallery.css";

const BASE_URL = "http://localhost:3005";

const uploader = new FineUploaderTraditional({
  options: {
    // autoUpload: false,
    chunking: {
      enabled: true
    },
    deleteFile: {
      enabled: true,
      endpoint: BASE_URL + "/uploads"
    },
    request: {
      endpoint: BASE_URL + "/uploads"
    }
    // retry: {
    //   enableAuto: true
    // }
  }
});

class UploadComponent extends Component {
  render() {
    return <Gallery uploader={uploader} />;
  }
}

export default UploadComponent;
