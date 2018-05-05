import React from "react";
import "./Period.css";
import ReactChartist from 'react-chartist';


const Period = props => (




  <div id="periodSelector" className="form-group col-3" placeholder="Period">
    <select className="form-control">
      <option disabled selected hidden>Period</option>
      <option></option>
      <option>Week</option>
      <option>Month</option>
      <option>Quarter</option>
      <option>Year</option>
    </select>
  </div>

  );

export default Period;
