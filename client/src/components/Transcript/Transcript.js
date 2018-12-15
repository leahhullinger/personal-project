// container for text detection response & editing/correcting text extracted from aws rekognition

import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTextDetect } from "../../ducks/reducer";

class Transcript extends Component {
  render() {
    return (
      <div>
        <textarea onChange={e => this.props.updateTextDetect(e.target.value)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    detectedText: state.detectedText
  };
}

export default connect(
  mapStateToProps,
  { updateTextDetect }
)(Transcript);
