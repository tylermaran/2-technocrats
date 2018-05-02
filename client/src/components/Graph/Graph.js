import React from "react";
import "./Graph.css";
import ReactChartist from 'react-chartist';


const optionsStock ={
    lineSmooth: true,
    height: "350px",
    axisY: {
        offset: 60,
        labelInterpolationFnc: function(value) {
            return '$' + value;
        }
    },
    stretch: true,
    low: 0,
    high: 1000,
    classNames: {
        point: 'ct-point ct-green',
        line: 'ct-line ct-green'
    }
};

const Graph = props => (




    <div className="graph card">

      <div className="header">

        <h4>{props.title}</h4>

      </div>

      <div className="content">

        <ReactChartist data={{
          labels: [ '\'10','\'11', '\'12', '\'13', '\'14', '\'15', '\'16', '\'17', '\'18'],
          series: [props.priceArray]
          }} options={optionsStock} type="Line" className="ct-chart" />

      </div>

    </div>

  );

export default Graph;
