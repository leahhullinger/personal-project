import React, { Component } from "react";
import Routes from "./routes";
import "./App.css";

var Tesseract = window.Tesseract;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main-body">
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
