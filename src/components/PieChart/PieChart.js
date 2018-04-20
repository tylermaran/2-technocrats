import React from "react";
import "./PieChart.css";

const PieChart = props => (
  <div className="piechart col-6">
    <div class="form-group" placeholder="Period">
      <select class="form-control">
        <option disabled selected hidden>Period</option>
        <option></option>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </select>
    </div>
    {/*Graph goes below*/}
    <h4>Portfolio Diversity</h4>
    <img className="pieImg" src={require(`${"./images/piechart.png"}`)} />

  </div>)

export default PieChart;
