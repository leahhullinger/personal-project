import React, { Component } from "react";
import ReactS3Uploader from "react-s3-uploader";

export default class S3Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: []
    };
  }
  onSignedUrl = () => {}

  handleFinishedUpload = info => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
  };

  render() {
    const uploadOptions = {
      server: "http://localhost:3005",
      signingUrlQueryParams: { uploadType: "avatar" }
    };
    const s3Url = "https://citizen-sidekick.s3.amazonaws.com";

    return (
      <ReactS3Uploader
        signingUrl="/s3/sign"
        signingUrlMethod="GET"
        accept={["image/*", "audio/*"]}
        s3path="/uploads/"
        onSignedUrl={this.onSignedUrl}
        onProgress={this.onUploadProgress}
        onError={this.onUploadError}
        onFinish={this.onUploadFinish}
        contentDisposition="auto"
        scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
        server="http://localhost:3005"
        inputRef={cmp => (this.uploadInput = cmp)}
        autoUpload={true}
      />
    );
  }
}
