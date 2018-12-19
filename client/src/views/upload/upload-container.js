// template form for newUploadForm, newUserForm
// redux
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import FileSelect from "../../components/Upload/FileSelect";
import PreviewCard from "../../components/Card/PreviewCard/PreviewCard";
import styles from "./upload-container.module.css";

import {
  updateDate,
  updateNotes,
  updateFolder,
  onFormSubmit,
  updateTextDetect
} from "../../ducks/reducer";

const BASE_URL = "http://localhost:3005";

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      uploads: [] // [{fileName: string, referenceLink: string, isSaved: boolean }]
    };
  }

  onUpdateLoading = () => this.setState({ loading: !this.state.loading });

  // need to connect file name to file Url
  onTranscript = file => {
    console.log("file being passed", file);
    axios
      .post("http://localhost:3005/api/textDetect", { file })
      .then(response => {
        console.log(response.data);
        this.props.updateTextDetect(response.data);
      });
  };
  // s3 function passed to s3 upload function in fileSelect
  setFileUrl = (url, fileName) => {
    var newUrl = url.substring(0, url.indexOf("?"));
    console.log(newUrl);
    this.setState({
      loading: false,
      uploads: [
        ...this.state.uploads,
        { referenceLink: newUrl, fileName, isSaved: false }
      ]
    });
  };

  onSubmitClick = refString => {
    const updated = this.state.uploads.map(f => {
      if (f.referenceLink === refString) {
        return { ...f, isSaved: true };
      }
      return f;
    });
    this.setState({
      uploads: updated
    });
    //onFormSubmit();
  };

  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    const { uploads, loading } = this.state;
    const fileCount = this.state.uploads.length;
    const savedFiles = uploads.filter(file => file.isSaved);
    console.log(uploads);
    return (
      <div>
        {fileCount < 3 && (
          <div className={styles.selectHeader}>
            <span className={styles.divider} />
            <FileSelect
              setFileUrl={this.setFileUrl}
              onUpdateLoading={this.onUpdateLoading}
              isDropZone={false}
            />
          </div>
        )}
        {loading && <h1>loading...</h1>}
        <div className={styles.uploadContainer}>
          {uploads.map((file, index) => {
            return (
              !file.isSaved && (
                <PreviewCard
                  file={file}
                  key={index}
                  onTranscript={this.onTranscript}
                  onSubmitClick={this.onSubmitClick}
                />
              )
            );
          })}
          {fileCount < 3 && (
            <FileSelect
              setFileUrl={this.setFileUrl}
              onUpdateLoading={this.onUpdateLoading}
              isDropZone={true}
            />
          )}
        </div>
        {!!savedFiles && (
          <ul>
            {savedFiles.map(file => (
              <li style={{ textAlign: "left" }} key={file.fileName}>
                {file.fileName} saved
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    filesToUpload: state.filesToUpload,
    date: state.date,
    folder: state.folder,
    notes: state.notes,
    detectedText: state.detectedText,
    folder: state.folder
  };
}

export default connect(
  mapStateToProps,
  {
    updateDate,
    updateNotes,
    updateFolder,
    onFormSubmit,
    updateTextDetect
  }
)(Uploader);
