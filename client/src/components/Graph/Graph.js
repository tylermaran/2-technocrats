import React from "react";
import "./Graph.css";

const Graph = props => (
  <div className="graph col-10">
    {/*Graph goes below*/}
    <img className="graphImg" src={require(`${"./images/graph.png"}`)} />
  </div>
);

export default Graph;
