// template form for newUploadForm, newUserForm
// redux
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FileSelect from '../../components/Upload/FileSelect';
import PreviewCard from '../../components/Card/PreviewCard/PreviewCard';
import styles from './upload-container.css';

import {
  updateDate,
  updateNotes,
  updateFolder,
  onFormSubmit,
} from '../../ducks/reducer';

const BASE_URL = 'http://localhost:3005';

class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      fileUrls: [],
    };
  }
  // need to connect file name to file Url
  onTranscript = file => {
    console.log('file being passed', file);
    axios.post('http://localhost:3005/api/transcript', file).then(response => {
      console.log(response.data);
      this.props.updateTextDetect(response.data);
    });
  };
  setFileUrl = url => {
    var newUrl = url.substring(0, url.indexOf('?'));
    console.log(newUrl);
    this.setState({ fileUrls: [...this.state.fileUrls, newUrl] });
  };

  onSubmitClick = () => {
    onFormSubmit();
  };

  // ADD CREATE FOLDER BUTTON, FOLDER SELECT
  render() {
    return (
      <div className="form-container">
        {this.state.fileUrls.length < 3 ? (
          <div className="dropzone">
            <FileSelect setFileUrl={this.setFileUrl} />
          </div>
        ) : null}
        {this.state.fileUrls.map((file, index) => {
          return (
            <PreviewCard
              src={file}
              key={index}
              onTranscript={this.onTranscript}
            />
          );
        })}
        <span className="divider" />
        <div className="form-inputs-container">
          <select
            placeholder="Add To Folder:"
            onChange={e => this.props.updateFolder(e.target.value)}
          />{' '}
          <input
            placeholder="Date"
            onChange={e => this.props.updateDate(e.target.value)}
          />
          <textarea
            placeholder="Notes"
            onChange={e => this.props.updateNotes(e.target.value)}
          />
        </div>
        <button onClick={this.onSubmitClick}>Save</button>
        <div className="main-form-container">
          <img src={this.state.image} />
        </div>
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
    folder: state.folder,
  };
}

export default connect(
  mapStateToProps,
  {
    updateDate,
    updateNotes,
    updateFolder,
    onFormSubmit,
  },
)(Uploader);
