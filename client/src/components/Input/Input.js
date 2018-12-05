import React from "react";
import "./Input.css";

export default props => (
  <input placeholder={props.placeholder} className="input">
    {props.children}
  </input>
);
