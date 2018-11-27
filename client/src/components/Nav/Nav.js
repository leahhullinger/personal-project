// template Component for desktop Nav and mobile bottom nav
import React, { Component } from "react";
import { AppBar } from "@material-ui/core";
import "../Nav/Nav.css";

// desktop
import { Drawer, SwipeableDrawer } from "@material-ui/core";
// mobile

class Nav extends Component {
  render() {
    return (
      <div className="nav-container">
        <h2>citizen => sidekick</h2>
        <p>log in</p>
      </div>
    );
  }
}

export default Nav;
