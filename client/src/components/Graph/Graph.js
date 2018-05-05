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
          labels: props.timeline,
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
      <div class="row" id="btnRow">
        <button onClick={() => props.displayWeek()}>Week</button><button onClick={() => props.displayMonth()}>Month</button><button>Quarter</button><button>Year</button>
      </div>
    </div>



  );

export default Graph;
