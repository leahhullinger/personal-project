import React, { Component } from "react";
import "./Button.module.css";

// const buttonClass = {
//   Primary,
//   Secondary,
//   icon
// };

export default function Button(props) {
  return <button>{props.children}</button>;
}
