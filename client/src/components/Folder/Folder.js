import React, { Component } from "react";
import axios from "axios";
import FileCard from "../Card/FileCard/FileCard";
import styles from "./Folder.module.css";

const BASE_URL = "http://localhost:3005";
export default class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      files: []
    };
  }

  componentDidMount() {
    axios
      .get(BASE_URL + `/api/folder/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        this.setState({ files: response.data });
      });
  }

  render() {
    console.log(this.props.match);
    return (
      <div className={styles.foldercontainer}>
        <h2>{this.state.foldername}</h2>
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
