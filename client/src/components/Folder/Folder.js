import React, { Component } from "react";
import axios from "axios";
import Card from "../Card/FileCard/FileCard";

const BASE_URL = "http://localhost:3005";
export default class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }
  componentDidMount(user_id) {
    axios.get(BASE_URL + `/folder/:user_id`).then(response => {
      console.log("loaded folder", response.data);
      this.setState({ files: response.data });
    });
  }

  render() {
    return (
      <div className="folder">
        {this.state.files.map(file => (
          <Card key={file.id} />
        ))}
      </div>
    );
  }
}
