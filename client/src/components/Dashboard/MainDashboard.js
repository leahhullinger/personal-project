// MAIN DASHBOARD

// displays Nav, UploadDash, FolderDash
// bonus: audio record button

import React, { Component } from "react";

import { Grid, GridCell, GridInner } from "@rmwc/grid";

import FolderDash from "./FolderDash";
import UploadDash from "./UploadDash/UploadDash";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div>
        <UploadDash />
        <FolderDash />
      </div>
    </div>
  );
}
