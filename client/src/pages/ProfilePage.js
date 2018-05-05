import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import Graph from "../components/Graph";
import News from "../components/News";
import PieChart from "../components/PieChart";
import stocks from "../stocks.json";

let axios = require("axios");

// let image = "./images/graph.png";
let title = "Stocks";
let news = "";
let min = 0;
let max = 1000;

class ProfilePage extends Component {
    state = {
    stocks,
    priceArray: [],
    title: "",
    timeline: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    dayLimit: 30
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


        const priceArray = [];
        for ( let i = 0; i < this.state.dayLimit; i++ ) {
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

    // testing get/post routing
    axios({
      method: 'GET',
      url: '/api/users/test',
    })
      .then((response) => {
        console.log(response);
        console.log("it works");
      });

  }

  displayWeek = () => {
    this.setState({  timeline: [ "1", "2", "3", "4", "5", "6", "7"],
    dayLimit:7 })
  }

  displayMonth = () => {
    this.setState({timeline: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
  dayLimit: 30 })
  }




  render() {
    return (
      <div className="app">
        <Navbar handleClick={this.handleClick}/>
        <Wrapper>
          <Title />
          <Graph
            title={title}
            priceArray={this.state.priceArray}
            min={min}
            max={max}
            timeline={this.state.timeline}
            displayWeek={this.displayWeek}
            displayMonth={this.displayMonth}
          />
          <div className="row">
            <News
              news={news}
            />
            <PieChart />
          </div>
        </Wrapper>
      </div>
  );
}
}

export default ProfilePage;
