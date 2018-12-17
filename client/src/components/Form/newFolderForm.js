import React, { Component } from "react";
import axios from "axios";

const BASE_URL = "http:localhost:3005";

export default class NewFolderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folder_name: ""
    };

    onInputChange = e => {
      this.setState({ folder_name: e.target.value });
    };
    onSaveFolder = () => {
      axios
        .post(BASE_URL + "/api/add/folder", {
          folder_name: this.state.folder_name
        })
        .then(response => {
          console.log("added new folder");
          this.setState({ folder_name: "" });
        });
    };
  }
  render() {
    return (
      <div>
        <div>
          <label>Folder Name: </label>
          <input value={this.state.folder_name} />
        </div>
        <button onClick={this.onSaveFolder}>Save</button>
      </div>
    );
  }
}
