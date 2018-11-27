import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper, Button, Input } from "@material-ui/core";

class Auth extends Component {
  render() {
    return (
      <div className="Auth-container">
        <Paper>
          <Input>Username</Input>
          <Input>Password</Input>
          <Button>Sign In</Button>
        </Paper>
      </div>
    );
  }
}
export default Auth;
