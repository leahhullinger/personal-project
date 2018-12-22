import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard-container";
import Folder from "../folder/folder-container";
import Uploader from "../upload/upload-container";

import styles from "./dashboard-router.module.css";
import {
  getFoldersComplete,
  getFilesComplete,
  addFolderComplete,
  addFileComplete,
  deleteFolderComplete,
  deleteFileComplete,
  updateFileComplete,
  axiosGetAllFiles,
  axiosGetAllFolders
} from "../../ducks/actions";

class DashboardRouter extends Component {
  componentDidMount() {
    axiosGetAllFolders().then(response => {
      this.props.dispatchSetFoldersState(response.data);
    });
    axiosGetAllFiles().then(response => {
      this.props.dispatchSetFilesState(response.data);
    });
  }
  render() {
    const {
      folders,
      files,
      dispatchAddFolderToState,
      dispatchDeleteFolder,
      dispatchAddUpload,
      dispatchDeleteFile,
      dispatchUpdateFile,
      match
    } = this.props;
    return (
      <div className={styles.view}>
        <header className={styles.mainHeader}>
          <img
            style={{ height: "70px" }}
            src={
              "https://s3.us-east-2.amazonaws.com/citizen-sidekick/IMG_0146.jpg"
            }
            alt="Citizen Sidekick logo"
          />
          <h1>CITIZEN SIDEKICK</h1>
        </header>
        <div className={styles.body}>
          <Switch>
            <Route
              exact
              path="/dash"
              render={() => (
                <Dashboard
                  folders={folders}
                  files={files}
                  dispatchAddFolderToState={dispatchAddFolderToState}
                  dispatchDeleteFolder={dispatchDeleteFolder}
                  match={match}
                />
              )}
            />
            <Route
              path={`${match.url}/folder/:id`}
              render={({ match }) => (
                <Folder
                  folders={folders}
                  files={files}
                  dispatchDeleteFolder={dispatchDeleteFolder}
                  dispatchDeleteFile={dispatchDeleteFile}
                  dispatchUpdateFile={dispatchUpdateFile}
                  match={match}
                />
              )}
            />
            <Route
              path="/dash/upload"
              render={({ match }) => (
                <Uploader
                  folders={folders}
                  dispatchAddFile={dispatchAddUpload}
                />
              )}
            />
          </Switch>
        </div>
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetFoldersState: folders => dispatch(getFoldersComplete(folders)),
    dispatchAddFolderToState: folder => dispatch(addFolderComplete(folder)),
    dispatchDeleteFolder: id => dispatch(deleteFolderComplete(id)),
    dispatchDeleteFile: id => dispatch(deleteFileComplete(id)),
    dispatchSetFilesState: files => dispatch(getFilesComplete(files)),
    dispatchUpdateFile: (id, file) => dispatch(updateFileComplete(id, file)),
    dispatchAddUpload: upload => dispatch(addFileComplete(upload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardRouter);
