// NEW UPLOAD DASHBOARD

// displays buttons: upload File, IMG => Text, audio => text

import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, SvgIcon } from "@material-ui/core";
import { Photo, Headset, Videocam, Note, Folder } from "@material-ui/icons";

export default function UploadDash() {
  return (
    <div className="upload-dash-container">
      <div className="upload-links-box">
        <div className="upload-photo-button">
          <IconButton>
            <SvgIcon>
              <Photo />
            </SvgIcon>
          </IconButton>
        </div>
        <div className="upload-audio-button">
          <IconButton>
            <SvgIcon>
              <Headset />
            </SvgIcon>
          </IconButton>
        </div>
        <div className="upload-video-button">
          <IconButton>
            <SvgIcon>
              <Videocam />
            </SvgIcon>
          </IconButton>
        </div>
        <div className="add-note-button">
          <IconButton>
            <SvgIcon>
              <Note />
            </SvgIcon>
          </IconButton>
        </div>
        <div className="folder-button">
          <IconButton>
            <SvgIcon>
              <Folder />
            </SvgIcon>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

// to add React-ui icons
/*
<IconButton aria-label="Delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
*/
