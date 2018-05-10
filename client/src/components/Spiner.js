import React from "react";
import spinner from "../assets/images/Loading 3.gif";

export default () => {
  return (
    <div className="align-items-center">
      <img src={spinner} style={{ width: "40px", margin: "auto" }} />
    </div>
  );
};
