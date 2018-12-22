// MAIN DASHBOARD
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import NewFolderModal from "../../components/Modal/NewFolderModal";
import styles from "./dashboard-container.module.css";
import FileCard from "../../components/Card/FileCard/FileCard";
import Folder from "../folder/folder-container";
import { Button } from "../../components/Button/Button";
import { axiosDeleteFolder, axiosAddFolder } from "../../ducks/actions";

class Dashboard extends Component {
  onAddFolderClick = folderName => {
    axiosAddFolder(folderName)
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
    const { folders, match, files } = this.props;
    console.log(files);
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div name="col-1" className={styles.content}>
            <h2>Folders</h2>
            {folders.map(folder => {
              console.log(folder);
              return (
                <div className={styles.folder} key={folder.id}>
                  <Link
                    className={styles.link}
                    to={`${match.url}/folder/${folder.id}`}
                  >
                    {folder.folder_name}
                  </Link>
                  <p onClick={() => this.onDeleteFolder(folder.id)} />
                </div>
              );
            })}
          </div>
          <div name="col-1" className={styles.content}>
            <Route
              path="/dash/folder/:id"
              render={({ match }) => (
                <Folder
                  folders={folders}
                  dispatchDeleteFolder={this.props.dispatchDeleteFolder}
                  match={match}
                />
              )}
            />
          </div>
        </div>
        <div>
          <Button>UPLOAD + </Button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
