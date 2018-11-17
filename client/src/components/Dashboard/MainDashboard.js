// MAIN DASHBOARD

// displays Nav, UploadDash, FolderDash
// bonus: audio record button

import React, { Component } from "react";
import FolderDash from "./FolderDash";
import UploadDash from "./UploadDash";
import Nav from "../Nav/Nav";

export default function Dashboard() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <UploadDash />
        <FolderDash />
      </div>
    </div>
  );
}
