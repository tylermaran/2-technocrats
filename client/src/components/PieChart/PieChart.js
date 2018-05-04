import React from "react";
import "./PieChart.css";

const PieChart = props => (
  <div className="piechart col-6">
    <div className="form-group" placeholder="Period">
      <select className="form-control">
        <option disabled selected hidden>Period</option>
        <option></option>
        <option>Week</option>
        <option>Month</option>
        <option>Quarter</option>
        <option>Year</option>
      </select>
    </div>
    {/*Graph goes below*/}
    <h4>Portfolio Diversity</h4>
    <img className="pieImg" alt="pie chart" src={require(`${"./images/piechart.png"}`)} />

  </div>)

export default PieChart;
