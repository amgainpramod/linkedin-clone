import React from "react";
import "./InputOption.css";

function InputOption({ Icon, title, color }) {
  return (
    <div className="inputOption">
      {/* <h3>This is input option</h3> */}
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default InputOption;
