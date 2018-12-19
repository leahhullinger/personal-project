import React from "react";
import { Thumbnail, Modal } from "react-bootstrap";
import { Btn as Button } from "../Button/Button";
import { Loading } from "../Loading/Loading";
// this is the modal that pops up when tr
// need help connecting image to user_id
import styles from "./TextDetect.module.css";

<<<<<<< HEAD
export const TextDetect = ({
  onUpdateTranscription,
  file,
  isOpen,
  onClose
}) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>Image Transcription</Modal.Header>
      <Modal.Body className={styles.body}>
        <Thumbnail src={file.referenceLink} className={styles.thumb} />
        {!!file.transcription && (
          <textarea
            placeholder="Transription"
            value={file.transcription}
            name="transcription"
            onChange={e => {
              onUpdateTranscription(file.fileName, {
                transcription: e.target.value
              });
            }}
            className={styles.text}
            disabled={!file.transcription}
          />
        )}
        {!file.transcription && <Loading />}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
=======
//  ADD TITLE INPUT
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
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>Here's the text your image.</Modal.Header>
          <Modal.Body>
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
>>>>>>> 2839e74b9eb8174ca2467a73b481091fd8b72dd0
