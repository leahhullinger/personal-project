import React, { Component } from "react";
import "./Button.module.css";

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <button>{this.props.children}</button>;
  }
}
