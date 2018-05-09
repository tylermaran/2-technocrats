import React from "react";
import "./PieChart.css";
import ReactChartist from 'react-chartist';
import axios from 'axios';

const Portfolio =[];

class PieChart extends React.Component {

  state = {
    portfolio: []
  };

componentDidMount () {
  // axios.get("/api/users/current").then(response => {
  //   console.log("YOOOOOOOOOOOOOOOOOOOOOOOOO");
  //   console.log(response)
  // });
  
}

render() {
  return (
  <div className="piechart col-6">
    {/*Graph goes below*/}
    <div className=" pie card">
        <h4>Portfolio Diversity</h4>

        <div className="header">

          <h4>{this.props.title}</h4>

        </div>

        <div className="content">

          <ReactChartist data={{
                series: this.state.portfolio
          }} options={{

            donut: true,

            donutWidth: 60,

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


          <div className="legend">
            <i className="fa fa-circle" id="btn1"></i> Microsoft

            <i className="fa fa-circle" id="btn2"></i> SPDR<br />

            <i className="fa fa-circle" id="btn3"></i> Facebook

            <i className="fa fa-circle" id="btn4"></i> Apple<br />

            <i className="fa fa-circle" id="btn5"></i> Tesla

            <i className="fa fa-circle" id="btn6"></i> Amazon<br />

            <i className="fa fa-circle" id="btn7"></i> USO

            <i className="fa fa-circle" id="btn8"></i> DOW<br />
          </div>

        </div>

      </div>

  </div>
    )
  }
}
      
export default PieChart;
