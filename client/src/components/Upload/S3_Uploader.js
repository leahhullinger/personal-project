import React from "react";
import ReactS3Uploader from 'react-s3-uploader';

export default S3_Uploader = () => (
  <ReactS3Uploader
  // /s3/sign returns json wiht signedUrl prop that can be used to PUT file in S3
  signingUrl="/s3/sign"
  signingUrlMethod="GET"
  accept="image/*"
  s3path="/uploads/"
  // preprocess allows you to do something before file upload begins
  preprocess={this.onUploadStart}
  onSignedUrl={this.onSignedUrl}
  onProgress={this.onUploadProgress}
  onError={this.onUploadError}
  onFinish={this.onUploadFinish}
  signingUrlHeaders={{ additional: headers }}
  signingUrlQueryParams={{ additional: query - params }}
  signingUrlWithCredentials={true} // in case when need to pass authentication credentials via CORS
  uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
  contentDisposition="auto"
  scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
  server="http://localhost:3005"
  inputRef={cmp => (this.uploadInput = cmp)}
  // auto upload will immediately upload to S3 when true
  autoUpload={true}
  // you can pass extra props like multiple to this component and they will be passed to children
  // className or nameProp for example
  multiple={true}
/>


