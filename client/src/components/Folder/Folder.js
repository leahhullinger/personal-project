import React, { Component } from "react";
import axios from "axios";
import FileCard from "../Card/FileCard/FileCard";
import styles from "./Folder.module.css";

const BASE_URL = "http://localhost:3005";
export default class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  componentDidMount() {
    axios.get(BASE_URL + "/api/files").then(response => {
      console.log(response.data);
      this.setState({ files: response.data });
    });
  }

  render() {
    return (
      <div className={styles.foldercontainer}>
        <h2>Folder Name</h2>
        <div>
          {this.state.files.map(file => {
            return (
              <FileCard key={file.id} date={file.date} notes={file.notes} />
            );
          })}
        </div>
      </div>
    );
  }
}
