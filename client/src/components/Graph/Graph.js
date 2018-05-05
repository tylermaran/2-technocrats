import React from "react";
import "./Graph.css";
import ReactChartist from 'react-chartist';




const Graph = props => (




    <div className="graph card">

      <div className="header">

        <h4>{props.title}</h4>

      </div>

      <div className="content">

        <ReactChartist data={{
          labels: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
          "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
          "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
          series: [props.priceArray]
          }} options={{
              lineSmooth: true,
              height: "350px",
              axisY: {
                  offset: 60,
                  labelInterpolationFnc: function(value) {
                      return '$' + value;
                  }
              },
              stretch: true,
              low: props.min,
              high: props.max,
              classNames: {
                  point: 'ct-point ct-green',
                  line: 'ct-line ct-green'
              }
          }} type="Line" className="ct-chart" />
      </div>

    </div>

  );

export default Graph;
