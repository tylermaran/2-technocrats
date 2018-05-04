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

let title = "Stocks";
let news = "";
let min = 0;
let max = 1000;

class App extends Component {
  state = {
    stocks,
    priceArray: [],
    title: ""
  };

  handleClick = id => {

    const stock = this.state.stocks.find( item => item.id === id );
    title = stock.title;
    const ticker = stock.title.toUpperCase(); // TODO: maybe unneeded??

    //  Pull stock data based on parameters
    var parameters = {
      symbols: ticker,
      types: 'chart,news',
      range: '1y',
      last: '5'
    }
    axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0//stock/market/batch',
      params: parameters
    })
      .then((response) => {

        var stockData = response.data[ticker];
        console.log(stockData);
        const dayLimit = 30;

        const priceArray = [];
        for ( let i = 0; i < dayLimit; i++ ) {
          priceArray.push( stockData.chart[i].close );
        }

        news = stockData.news[0].headline;

        min = Math.min.apply(Math, priceArray);
        max = Math.max.apply(Math, priceArray);

        // const priceArray = stockData.chart
        //   .map( quote => quote.close )
        //   .filter( (quote, i) => i < dayLimit );

        this.setState({ priceArray })

      });

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
            priceArray={this.state.priceArray}
            min={min}
            max={max}
          />
          <div className="row">
            <News
              news={news}
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
