import React from "react";
import "./Graph.css";
import ReactChartist from 'react-chartist';
import Chartist from 'chartist';

const dataStock = {
    labels: [ '\'10','\'11', '\'12', '\'13', '\'14', '\'15', '\'16', '\'17', '\'18'],
    series: [
        [22.20, 34.90, 42.28, 51.93, 62.21, 80.23,62.21, 82.12, 102.50, 107.23]
    ]
};

const optionsStock ={
    lineSmooth: true,
    height: "350px",
    axisY: {
        offset: 100,
        labelInterpolationFnc: function(value) {
            return '$' + value;
        }
    },
    low: 10,
    high: 110,
    classNames: {
        point: 'ct-point ct-green',
        line: 'ct-line ct-green'
    }
};

const Graph = () => (

    <div className="graph card">

      <div className="header">

        <h4>Stocks</h4>

      </div>

      <div className="content">

        <ReactChartist data={dataStock} options={optionsStock} type="Line" className="ct-chart" />

      </div>

    </div>

  );

export default Graph;
