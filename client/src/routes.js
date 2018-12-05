import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import FileUploader from "./components/Upload/FileUploader";
import FileSelect from "./components/Upload/FileSelect";
import Form from "./components/Form/Form";
import Login from "./components/Login/Login";
import UploadForm from "./components/Form/UploadForm";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/dash" component={Dashboard} />
    <Route path="/upload" component={FileUploader} />
    <Route path="/form" component={Form} />
    <Route path="/uploadform" component={FileSelect} />
  </Switch>
);
