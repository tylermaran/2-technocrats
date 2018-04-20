import React from "react";
import "./PieChart.css";

const PieChart = props => (
  <div className="graph col-6">
    <div class="form-group">
      <select class="form-control" id="q2">
        <option ></option>
        <option value="1">Strongly Disagree</option>
        <option value="2">Disagree</option>
        <option value="3">Nuetral</option>
        <option value="4">Agree</option>
        <option value="5">Strongly Agree</option>
      </select>
    </div>
    {/*Graph goes below*/}
    <img src={require(`${"./images/piechart.png"}`)} />

  </div>)

export default PieChart;
