// import Button from "../Button/Button";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const BASE_URL = "http://localhost3005";
class FileSelect extends Component {
  // constructor(props){
  //     super(props);
  // }

  _onDrop = files => {
    const file = files[0];
    console.log(file);

    axios
      .post(BASE_URL + `/api/aws`, {
        filename: file.name,
        filetype: file.type
      })
      .then(response => {
        const signedUrl = response.data;
        const options = {
          headers: {
            "Content-Type": file.type
          }
        };

        return axios.put(signedUrl, file, options);
      })
      .then(response => {
        console.log(response);
        this.props.setFileUrl(response.config.url);
      })
      .catch(err => {
        console.log(2, err);
      });
  };

  render() {
    return (
      <Dropzone multiple onDrop={this._onDrop}>
        <div>Click to upload file!</div>
      </Dropzone>
    );
  }
}

export default FileSelect;
// const styles = {
//   input: {
//     display: "none"
//   }
// };

// function FileSelect(props) {
//   return (
//     <div className="file-selector-container">
//       <input
//         accept={["image/*", "audio/*", "video/*"]}
//         className="file-select-input"
//         id="fileSelect"
//         multiple
//         type="file"
//         style={styles.input}
//       />
//       <Button variant="outlined">
//         <label htmlFor="fileSelect">Select Files</label>
//       </Button>
//     </div>
//   );
// }

// export default FileSelect;
