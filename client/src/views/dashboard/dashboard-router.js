import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard-container";
import Folder from "../folder/folder-container";
import Uploader from "../upload/upload-container";
import { Modal } from "../../components/Modal/Modal";

import styles from "./dashboard-router.module.css";
import {
  getFoldersComplete,
  getFilesComplete,
  addFolderComplete,
  deleteFolderComplete,
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
      match
    } = this.props;
    return (
      <div className={styles.view}>
        <header className={styles.mainHeader}>
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
              path="/dash/folder/:id"
              render={({ match }) => (
                <Folder
                  folders={folders}
                  dispatchDeleteFolder={dispatchDeleteFolder}
                  match={match}
                />
              )}
            />
            <Route
              path="/dash/upload"
              render={({ match }) => <Uploader folders={folders} />}
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
    dispatchSetFilesState: files => dispatch(getFilesComplete(files))
    // dispatchAddUpload: upload => dispatch()
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardRouter);
