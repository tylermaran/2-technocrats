import React from "react";
import "./PieChart.css";
import ReactChartist from 'react-chartist';
import Chartist from 'chartist';

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

      <div className=" pie card">

        <div className="header">

          <h4>{props.title}</h4>

        </div>

        <div className="content">

          <ReactChartist data={{
                labels: ['62%','32%','6%'],
                series: [62, 32, 6]
          }} options={{

            donut: true,

            donutWidth: 40,

            startAngle: 0,

            height: "245px",

            total: 100,

            showLabel: false,

            axisX: {

              showGrid: false,

              offset: 0

            },

            axisY: {

              offset: 0

            }

          }} type="Pie" className="ct-chart" />

        </div>

        <div className="footer">



          <i className="fa fa-circle text-info"> </i>  Apple

          <i className="fa fa-circle text-warning"> </i>  Samsung

          <i className="fa fa-circle text-danger"> </i>  Windows Phone

        </div>

      </div>

  </div>)

export default PieChart;
