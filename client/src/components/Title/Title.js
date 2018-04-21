import React from "react";
import "./Title.css";

let title = "Student Portfolio";

const Title = props => (
  <div className="row">
    <div className="col-7 title">Student Portfolio</div>
    <form className="col-5 form">
      <input placeholder=" search"/>
    </form>
  </div>
)

export default Title;
