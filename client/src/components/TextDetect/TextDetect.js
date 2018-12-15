import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Thumbnail, Modal, Button } from "react-bootstrap";
import { updateTextDetect } from "../../ducks/reducer";
// this is the modal that pops up when tr
// need help connecting image to user_id

class TextDetect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }
  // onTranscript = () => {
  //   axios
  //     .post("http://localhost:3005/api/transcript", this.props.file)
  //     .then(response => {
  //       console.log(response);
  //       this.props.updateTextDetect(response.data);
  //     });
  // };
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <div>
        <Button onClick={this.onTranscript}>Test Transcript</Button>
        {/* need to add axios.post func to get text from image*/}
        <Button onClick={this.handleShow}>
          <i data-feather="type">Transcript</i>
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>Here's the text your image.</Modal.Header>
          <Modal.Body>
            <Thumbnail src={this.props.src} />
            <textarea
              onChange={e => this.props.updateTextDetect(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { name } = state.filesToUpload.name;
  return {
    name,
    detectedText: state.detectedText
  };
}

export default connect(
  mapStateToProps,
  { updateTextDetect }
)(TextDetect);
