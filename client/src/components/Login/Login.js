import React, { Component } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3005";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  render() {
    return <div className="login-page">Login Page</div>;
  }
}
