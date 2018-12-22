import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import DashboardRouter from "./views/dashboard/dashboard-router";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main-body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dash" component={DashboardRouter} />
            {/* <Redirect to="/" /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
