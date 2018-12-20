import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Thumbnail, Modal, Button } from "react-bootstrap";
import { updateTextDetect } from "../../ducks/reducer";
// this is the modal that pops up when tr
// need help connecting image to user_id
const BASE_URL = "http://localhost:3005";

class TextDetect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      title: "",
      detectedText: ""
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  onInputChange = e => {
    this.setState({ title: e.target.value });
  };

  // componentDidMount() {
  //   // once response comes back from onTranscript()
  //   axios
  //     .post(BASE_URL + "/api/textDetect/response", { upload_id, detectedText })
  //     .then(this.setState({ detectedText }));
  // }
  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            Here's the text from your image
          </Modal.Header>
          <Modal.Body>
            <input
              name="title"
              placeholder="title"
              onChange={this.onInputChange}
            />
            <Thumbnail src={this.props.src} />
            <textarea
              onChange={e => this.props.updateTextDetect(e.target.value)}
            >
              {this.props.detectedText}
            </textarea>
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
  return {
    detectedText: state.detectedText
  };
}

export default connect(
  mapStateToProps,
  { updateTextDetect }
)(TextDetect);
