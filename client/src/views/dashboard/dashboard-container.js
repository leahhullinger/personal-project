// MAIN DASHBOARD
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FileCard from "../../components/Card/FileCard/FileCard";
import NewFolder from "../../components/Form/NewFolder/NewFolder";
import styles from "./dashboard-container.module.css";
import Modal from "../../components/Modal/Modal";

import {
  getFoldersComplete,
  addFolderComplete,
  deleteFolderComplete,
  axiosGetAllFolders,
  axiosDeleteFolder,
  axiosAddFolder,
  axiosGetFolder
} from "../../ducks/actions";

class Dashboard extends Component {
  state = {
    folderName: ""
  };

  onAddFolderClick = () => {
    axiosAddFolder(this.state.folderName)
      .then(response => {
        this.props.dispatchAddFolderToState(response.data.folder);
      })
      .catch(err => console.log(err));
  };

  onDeleteFolder = id => {
    console.log(id);
    axiosDeleteFolder(id).then(response => {
      console.log(response);
      this.props.dispatchDeleteFolder(id);
    });
  };

  handleInputUpdate = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { folders, match } = this.props;
    return (
      <div className={styles.container}>
        <h3>Dashboard</h3>
        <div className={styles.body}>
          <div>
            <h4>Recent Activity</h4>
            <p>5 most recent files </p>
          </div>
          <div>
            <Link to={`${match.url}/upload`}>
              <h2>+ UPLOAD </h2>
            </Link>

            <NewFolder
              folderName={this.state.folderName}
              onChange={this.handleInputUpdate}
              onAdd={this.onAddFolderClick}
            />
          </div>
        </div>
        <div>
          <h2>Folders</h2>
          {folders.map(folder => {
            console.log(folder);
            return (
              <div key={folder.id}>
                <Link to={`${match.url}/folder/${folder.id}`}>
                  {folder.folder_name}
                </Link>
                <p onClick={() => this.onDeleteFolder(folder.id)}>delete</p>
              </div>
            );
          })}
        </div>
        <div style={{ backgroundColor: "#a87a2f" }}>
          <Link to="/folder">
            <h2>+ UPLOAD </h2>
          </Link>
        </div>
        {/* <UploadDash />
      <FolderDash /> */}
      </div>
    );
  }
}

export default Dashboard;
