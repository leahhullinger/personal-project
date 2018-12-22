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
  addFolderComplete,
  deleteFolderComplete,
  axiosGetAllFolders
} from "../../ducks/actions";

class DashboardRouter extends Component {
  componentDidMount() {
    axiosGetAllFolders().then(response => {
      this.props.dispatchSetFoldersState(response.data);
    });
  }
  render() {
    const {
      folders,
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
    folders: state.folders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetFoldersState: folders => dispatch(getFoldersComplete(folders)),
    dispatchAddFolderToState: folder => dispatch(addFolderComplete(folder)),
    dispatchDeleteFolder: id => dispatch(deleteFolderComplete(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardRouter);
