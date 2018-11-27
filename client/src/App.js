import React, { Component } from "react";
import axios from "axios";
import Routes from "./routes";
import "./App.css";

import Nav from "./components/Nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import NewEventForm from "./components/Form/NewEventForm";
import { Jumbotron } from "react-bootstrap";
import Button from "@material-ui/core/Button";
// Material UI Components to use
/* 
 - Navbar, bottom navbar
 - Paper
 - Icon Buttons
 - Card: for image preview
 - Expansion Panel
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="main-body">
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
