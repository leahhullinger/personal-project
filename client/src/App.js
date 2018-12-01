import React, { Component } from "react";
import axios from "axios";
import Routes from "./routes";
import "./App.css";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import NewEventForm from "./components/Form/NewEventForm";

var Tesseract = window.Tesseract;

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
