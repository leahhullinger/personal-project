import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

const BASE_URL = "http://localhost:3005";
export default class FolderDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      folderName: "",
      description: ""
    };
  }
  componentDidMount(user_id) {
    axios
      .get(BASE_URL + "/api/folders/:user_id")
      .then(response => {
        console.log("folders", response.data);
        this.setState({ folders: response.data });
      })
      .catch(error => {
        console.log("failed to load folders", error);
      });
  }
  onNewFolder = e => {
    const { folderName, description } = this.state;
    axios
      .post(BASE_URL + "/api/folders", {
        folderName,
        description
      })
      .then(this.setState({ folderName: "", description: "" }));
  };

  render() {
    return (
      <div>
        <div>
          <Button>New Folder</Button>
        </div>
        <div>
          {this.state.folders.map(folder => (
            <div key={folder.id}>Folder Links</div>
          ))}
        </div>
      </div>
    );
  }
}
