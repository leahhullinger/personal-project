import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Dashboard from "./components/Dashboard/MainDashboard";
import Form from "./components/Form/Form";
import NewEventForm from "./components/Form/NewEventForm";
import FineUploader from "./components/Upload/FineUploader";
import Typography from "@rmwc/typography";
import "@material/typography/dist/mdc.typography.css";

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
        <div className="headline-container">
          <Typography use="headline2">citizen ==></Typography>
          <Typography use="headline2"> sidekick</Typography>
        </div>
        <Dashboard />
        <Form />
      </div>
    );
  }
}

export default App;
