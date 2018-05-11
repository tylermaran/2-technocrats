import React from "react";
import "./Graph.css";
import ReactChartist from "react-chartist";
import SellBtn from "../SellBtn";
import BuyBtn from "../BuyBtn";

const Graph = props => (


  <div className="graph card">
    <div className="header">
      <h4 id="stockTitle">{props.title}</h4>
      <h4 id="stockTitle">{props.currentPrice}</h4>

    </div>
    <div className="row" style={{ marginBottom: "50px"}}>
    <BuyBtn /><SellBtn />
    </div>

    <div className="content">
      <ReactChartist
        data={{
          labels: props.timeline,
          series: [props.priceArray]
        }}
        options={{
          lineSmooth: true,
          height: "350px",
          axisY: {
            offset: 60,
            labelInterpolationFnc: function(value) {
              return "$" + value;
            }
          },
          stretch: true,
          low: props.min,
          high: props.max,
          classNames: {
            point: "ct-point ct-green",
            line: "ct-line ct-green"
          }
        }}
        type="Line"
        className="ct-chart"
      />
    </div>
    <div className="row" id="btnRow">
      <button onClick={() => props.displayWeek()}>Week</button>
      <button onClick={() => props.displayMonth()}>Month</button>
      <button onClick={() => props.displayQuarter()}>Quarter</button>
      <button onClick={() => props.displayYear()}>Year</button>
    </div>
  </div>
);

export default Graph;
