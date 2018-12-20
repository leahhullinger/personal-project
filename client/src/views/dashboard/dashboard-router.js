import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../../components/Dashboard/Dashboard";
import Folder from "../../components/Folder/Folder";
import Uploader from "../upload/upload-container";

import styles from "./dashboard-router.module.css";

class DashboardRouter extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className={styles.view}>
        <header className={styles.mainHeader}>
          <h1>CITIZEN SIDEKICK</h1>
        </header>
        <div className={styles.body}>
          <Switch>
            <Route exact path={match.url} component={Dashboard} />
            <Route path={`${match.url}/folder/:id`} component={Folder} />
            <Route path={`${match.url}/upload`} component={Uploader} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default DashboardRouter;
