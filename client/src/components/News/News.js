import React from "react";
import "./News.css";

const News = props => (
  <div className="news col-6">
    <h1>Market News</h1>
    <p id="blurb">{props.news}</p>
  </div>)

export default News;
