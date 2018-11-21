import React, { Component } from "react";
import UploadPreview from "material-ui-upload/UploadPreview";

class PreviewWindow extends Component {
  onPreviewDrop = files => {
    this.setState({
      files: this.state.files.concat(files)
    });
  };

  render() {
    return (
      <div className="media-preview-window">
        <UploadPreview>Upload Preview Window</UploadPreview>
      </div>
    );
  }
}
export default PreviewWindow;
