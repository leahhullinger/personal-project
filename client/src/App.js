import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Dashboard from "./components/Dashboard/MainDashboard";
import NewEventForm from "./components/Form/NewEventForm";
import FineUploader from "./components/Upload/FineUploader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>sidekick.IO</h1>
        <FineUploader />
        <Dashboard />
      </div>
    );
  }
}

export default App;
