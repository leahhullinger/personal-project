// MAIN DASHBOARD
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FileCard from "../../components/Card/FileCard/FileCard";
import NewFolder from "../../components/Form/NewFolder/NewFolder";
import styles from "./dashboard-container.module.css";

const BASE_URL = "http://localhost:3005";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: []
    };
  }
  // componentDidMount() {
  //   axios.get(BASE_URL + "/api/folders/").then(response => {
  //     this.setState({ folders: response.data });
  //   });
  // }

  onNewFolderClick = () => {
    axios.post("/api/add/folder", { name: "my test folder" }).then(response => {
      console.log(response);
    });
  };
  render() {
    return (
      <div className={styles.container}>
        <h3>Dashboard</h3>
        <div className={styles.body}>
          <div>
            <h4>Recent Activity</h4>
            <p>5 most recent files </p>
          </div>
          <div>
            <Link to="/upload">
              <h2>+ UPLOAD </h2>
            </Link>
            <NewFolder />
          </div>
        </div>
        {/* <div>
          {this.state.folders.map(folder => {
            return (
              <div>
                <div key={folder.id}>
                  <p>{folder.folder_name}</p>
                </div>
              </div>
            );
          })}
        </div> */}
        <div style={{ backgroundColor: "#a87a2f" }}>
          <Link to="/upload">
            <h2>+ UPLOAD </h2>
          </Link>
        </div>
        {/* <UploadDash />
      <FolderDash /> */}
      </div>
    );
  }
}
