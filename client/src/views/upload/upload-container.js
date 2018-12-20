// template form for newUploadForm, newUserForm
// redux
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../../ducks/constants";
import FileSelect from "../../components/Upload/FileSelect";
import PreviewCard from "../../components/Card/PreviewCard/PreviewCard";
import { Loading } from "../../components/Loading/Loading";
import { onFormSubmit } from "../../ducks/actions";

import styles from "./upload-container.module.css";

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      /** Upload data structure
      [
        {fileName: string, 
         referenceLink: string, 
         transcription: string, 
         isSubmitted: boolean 
        }
      ] */
      uploads: [
        {
          fileName: "textmessage_image_1.jpg",
          referenceLink:
            "https://jonbrown.org/assets/images/blog/2017/bluegreen/textmessage_image_1.jpg",
          isSubmitted: false
        }
      ]
    };
  }

  onUpdateLoading = val => this.setState({ loading: val });

  onUpdateUpload = (fileName, updated) => {
    const updatedUploads = this.state.uploads.map(f => {
      if (f.fileName === fileName) {
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
        this.onUpdateUpload(file, { transcription: response.data });
      })
      .catch(err => console.log(err));
  };

  // s3 function passed to s3 upload function in fileSelect
  setFileUrl = (url, fileName) => {
    var newUrl = url.substring(0, url.indexOf("?"));
    this.setState({
      loading: false,
      uploads: [
        ...this.state.uploads,
        { referenceLink: newUrl, fileName, isSubmitted: false }
      ]
    });
  };

  onSubmitClick = file => {
    const updated = this.state.uploads.map(f => {
      if (f.fileName === file.fileName) {
        return { ...f, isSubmitted: true };
      }
      return f;
    });
    this.setState({
      uploads: updated
    });
    this.props.dispatchOnFileSubmit(
      updated.find(f => f.fileName === file.fileName)
    );
  };

  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    const { uploads, loading } = this.state;
    const fileCount = this.state.uploads.filter(item => !item.isSubmitted)
      .length;
    const submittedFiles = uploads.filter(file => file.isSubmitted);
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
            />
          )}
        </div>
        <div className={!submittedFiles.length ? styles.hidden : styles.saved}>
          {submittedFiles.map(file => (
            <p className={styles.savedItem} key={file.fileName}>
              + {file.fileName} saved
            </p>
          ))}
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     filesToUpload: state.filesToUpload,
//     date: state.date,
//     folder: state.folder,
//     notes: state.notes,
//     detectedText: state.detectedText
//   };
// }
function mapDispatchToProps(dispatch) {
  return {
    dispatchOnFileSubmit: file => dispatch(onFormSubmit(file))
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(Uploader);
