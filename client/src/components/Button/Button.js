import React, { Component } from "react";
import "./Button.module.css";

export default function Button(props) {
  return <button>{props.children}</button>;
}
