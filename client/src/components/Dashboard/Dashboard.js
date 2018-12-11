// MAIN DASHBOARD
import React, { Component } from "react";
import { Link } from "react-router-dom";

import FolderDash from "./FolderDash/FolderDash";
import UploadDash from "./UploadDash/UploadDash";

export default class Dashboard extends Component {
  componentDidMount() {
    // console.log()
  }
  render() {
    return (
      <div className="dashboard-container">
        <div>
          <h1>hey, _____ </h1>
          <h2>sidekick here.</h2>
        </div>
        <div style={{ backgroundColor: "#a87a2f" }}>
          <Link to="/upload">
            <h1>+ ADD </h1>
          </Link>
          <h1>FIND</h1>
        </div>
        {/* <UploadDash />
      <FolderDash /> */}
      </div>
    );
  }
}
