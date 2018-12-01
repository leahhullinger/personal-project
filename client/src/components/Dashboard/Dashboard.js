// MAIN DASHBOARD
import React from "react";
// import { Link } from "react-router-dom";
// import { Drawer } from "@material-ui/core";

// displays Nav, UploadDash, FolderDash
// bonus: audio record button

import FolderDash from "./FolderDash";
import UploadDash from "./UploadDash/UploadDash";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* <Drawer variant="permanent" anchor="right">
        <div>Drawer</div>
      </Drawer> */}
      <UploadDash />
    </div>
  );
}
