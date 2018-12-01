import React from "react";
import "../Paper/Paper.css";

export default function Paper(props) {
  return (
    <div className="paper-container">
      <div className="paper">{props.children}</div>
    </div>
  );
}
