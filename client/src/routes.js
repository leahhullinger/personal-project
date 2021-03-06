import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Dashboard from "./views/dashboard/dashboard-container";
import Uploader from "./views/upload/upload-container";
import Login from "./components/Login/Login";
import PreviewCard from "./components/Card/PreviewCard/PreviewCard";
import Folder from "./components/Folder/Folder";
import NewFolderForm from "./components/Form/NewFolder/NewFolder";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/dash" component={Dashboard} />
    <Route path="/upload" component={Uploader} />
    <Route path="/previewCard" component={PreviewCard} />
    <Route path="/folder/:id" component={Folder} />
    <Route path="/newFolder" component={NewFolderForm} />
  </Switch>
);
