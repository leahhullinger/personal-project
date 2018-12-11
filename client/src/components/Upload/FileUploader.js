import React, { Component } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3005";
export default class S3Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      url: []
    };
  }

  onFileSelect = e => {
    const files = e.target.files;

    console.log("selected files", files);
    this.setState({ files: files });

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = e => {
      const formData = { file: e.target.result };
      return axios.post(BASE_URL + "/upload", formData).then(response => {
        console.log("result", response);
      });
    };
  };

  handleFinishedUpload = info => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
  };

  render() {
    return (
      <div>
        <input type="file" onChange={e => this.onFileSelect(e)} />
      </div>
    );
  }
}
