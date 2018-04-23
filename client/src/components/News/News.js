import React from "react";
import "./News.css";

const PieChart = props => (
  <div className="news col-6">
    <h1>Market News</h1>
    <p id="blurb">{props.news}</p>
  </div>)

export default PieChart;
