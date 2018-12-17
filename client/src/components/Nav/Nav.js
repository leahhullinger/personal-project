import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownButton, MenuItem } from "react-bootstrap";
import "../Nav/Nav.css";

class Nav extends Component {
  render() {
    return (
      <div className="top-nav-bar">
        <div className="nav-container" style={{ padding: "10px" }}>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    );
  }
}

export default Nav;
