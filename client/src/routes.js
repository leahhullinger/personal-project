import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import FileUploader from "./components/Upload/FileUploader";

export default () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/login" component={Auth} />
    {/* <Route path="/dashboard" component={MainDashboard} /> */}
    <Route path="/upload" component={FileUploader} />
  </Switch>
);
