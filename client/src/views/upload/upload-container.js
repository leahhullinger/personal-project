// template form for newUploadForm, newUserForm
// redux
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../../ducks/constants";
import FileSelect from "../../components/Upload/FileSelect";
import PreviewCard from "../../components/Card/PreviewCard/PreviewCard";
import { Loading } from "../../components/Loading/Loading";
import { axiosAddFile } from "../../ducks/actions";

import styles from "./upload-container.module.css";

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      uploads: []
    };
  }
  onUpdateLoading = val => this.setState({ loading: val });

  onUpdateUpload = (filename, updated) => {
    const updatedUploads = this.state.uploads.map(f => {
      if (f.filename === filename) {
        return { ...f, ...updated };
      }
      return f;
    });
    this.setState({ uploads: updatedUploads });
  };

  onTranscript = file => {
    console.log("file being passed", file);
    axios
      .post(`${API_URL}/textDetect`, { file })
      .then(response => {
        console.log(response.data);
        this.onUpdateUpload(file, { transcript: response.data });
      })
      .catch(err => console.log(err));
  };

  // s3 function passed to s3 upload function in fileSelect
  setFileUrl = (url, file) => {
    var newUrl = url.substring(0, url.indexOf("?"));
    console.log(file);
    this.setState({
      loading: false,
      uploads: [
        ...this.state.uploads,
        {
          s3_url: newUrl,
          filename: file.name,
          filetype: file.type,
          isSubmitted: false
        }
      ]
    });
  };

  // title, date, notes, filename, filetype, s3_url, transcript, folder_id
  onSubmitClick = filename => {
    const file = this.state.uploads.find(file => file.filename === filename);
    const uploadFile = {
      title: file.notes.title,
      date: file.notes.date,
      notes: file.notes.text,
      filename: file.filename,
      filetype: file.filetype,
      s3_url: file.s3_url,
      transcript: file.transcript,
      folder_id: file.notes.folder_id
    };
    console.log(uploadFile);
    axiosAddFile(uploadFile)
      .then(res => console.log(res))
      .catch(err => console.log({ err }));
  };

  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    const { uploads, loading } = this.state;
    const fileCount = this.state.uploads.filter(item => !item.isSubmitted)
      .length;
    const submittedFiles = uploads.filter(file => file.isSubmitted);
    console.log(uploads);
    return (
      <div>
        <div className={styles.selectHeader}>
          <span className={styles.divider} />
          <FileSelect
            setFileUrl={this.setFileUrl}
            onUpdateLoading={this.onUpdateLoading}
            isDropZone={false}
            disabled={fileCount === 3}
          />
        </div>
        <div className={styles.uploadContainer}>
          {!!loading && <Loading className={styles.previewCardPlaceholder} />}
          {uploads.map((file, index) => {
            return (
              !file.isSubmitted && (
                <PreviewCard
                  key={index}
                  file={file}
                  folders={this.props.folders}
                  onUpdateUpload={this.onUpdateUpload}
                  onTranscript={this.onTranscript}
                  onSubmitClick={this.onSubmitClick}
                />
              )
            );
          })}
          {(fileCount < 2 || (fileCount === 2 && !loading)) && (
            <FileSelect
              setFileUrl={this.setFileUrl}
              onUpdateLoading={this.onUpdateLoading}
              isDropZone={true}
              onUpdateUpload={this.onUpdateUpload}
            />
          )}
        </div>
        <div className={!submittedFiles.length ? styles.hidden : styles.saved}>
          {submittedFiles.map(file => (
            <p className={styles.savedItem} key={file.filename}>
              + {file.filename} saved
            </p>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    folderIds: state.folders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchOnFileSubmit: file => dispatch(console.log(file))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader);
