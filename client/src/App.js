import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Graph from "./components/Graph";
import News from "./components/News";
import PieChart from "./components/PieChart";
import stocks from "./stocks.json";
import "./App.css";
var axios = require("axios");

let image = "./images/graph.png";
let title = "Stocks";
let priceArray = [22.2, 34.9, 42.28, 51.93, 62.21, 82.12, 102.5, 107.23];

class App extends Component {
  state = {
    response: "something",
    stocks
  };

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/users/test");
    const body = await response.json();
    console.log(body)
    if (response.status !== 200) throw Error(`my error ${body.message}`);

    return body;
  };
  // state = {
  //   stocks
  // };

  handleClick = id => {
    this.state.stocks.map(stock => (
      (stock.id === id) ? (title = stock.title) : null
    ))
    console.log(title);
    var ticker = title;
    ticker = ticker.toUpperCase();
    console.log(ticker);
    var parameters = {
      symbols: ticker,
      types: 'chart,news',
      range: '1y',
      last: '5'
    }
    //  Pull stock data based on parameters
    axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0//stock/market/batch',
      params: parameters,

    })
      .then(function (response) {
        var sourceData = response.data;
        var chartArray = []
        for (let index = 0; index < sourceData[ticker].chart.length; index++) {
          var chartValue = {
            date: sourceData[ticker].chart[index].date,
            value: sourceData[ticker].chart[index].close,
          }
          chartArray.push(chartValue);
        }
        var returnObject = {
          price: chartArray,
          news: sourceData[ticker].news
        }

        console.log(returnObject);


        for (var j = 0; j < 10 ; j++) {
          // newPriceArray.push(returnObject.price[j].value)
        }

      });



      // console.log(newPriceArray);




    this.setState({ stocks })
  }



  render() {
    return (
    <Router>
      <div className="container-fluid">
        <Navbar handleClick={this.handleClick}/>
        <Wrapper>
          <Title />
          <Graph
            title={title}
            // priceArray={newPriceArray}
          />
          <div className="row">
            <News
              title={title}
            />
            <PieChart />
          </div>
        </Wrapper>
      </div>
    </Router>
  );
}
}

export default App;
