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
  getAllFolders,
  folderActions,
  addFolder
} from "../../ducks/actions";

class Dashboard extends Component {
  componentDidMount() {
    getAllFolders().then(response => {
      console.log({ res: response.data });
      this.props.dispatchSetFoldersState(response.data);
    });
  }

  state = {
    folderName: ""
  };

  onAddFolderClick = () => {
    addFolder(this.state.folderName)
      .then(response => {
        console.log({ response });
        // need either the folder or folderId in the response
        /*  this.props.folderAction("get", id).then(res => {
          this.props.dispatchAddFolderToState(response.data);
        }) */
      })
      .catch(err => console.log(err));
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
            return (
              <div key={folder.id}>
                <Link to={`${match.url}/folder/${folder.id}`}>
                  {folder.folder_name}
                </Link>
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
const mapStateToProps = state => {
  return {
    folders: state.folders,
    files: state.files
  };
};

const dispatchToProps = dispatch => {
  return {
    dispatchSetFoldersState: folders => dispatch(getFoldersComplete(folders)),
    dispatchAddFolderToState: folder => dispatch(addFolderComplete(folder))
  };
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(Dashboard);
