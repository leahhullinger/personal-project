import React, { Component } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = () => {
    axios.post("http://localhost:3005/api/authenticate", {
      username,
      password,
      email
    });
  };
  render() {
    return (
      <div>
        <Modal>
          <input
            name="username"
            placeholder="USERNAME"
            onChange={this.onInputChange}
          />
          <input
            name="password"
            placeholder="PASSWORD"
            onChange={this.onInputChange}
          />
          <input
            name="email"
            placeholder="EMAIL"
            onChange={this.onInputChange}
          />
          <Button onClick={this.onSubmit}>Submit</Button>
        </Modal>
      </div>
    );
  }
}
