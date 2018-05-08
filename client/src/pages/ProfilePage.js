import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import Graph from "../components/Graph";
import News from "../components/News";
import PieChart from "../components/PieChart";
import stocks from "../stocks.json";
import NavBarTop from '../components/Navbar/NavBarTop.js'
import "../index.css";


let axios = require("axios");

// let image = "./images/graph.png";
let title = "Stocks";
let news1 = "";
let newsLink1 = "";
let news2 = "";
let newsLink2 = "";
let news3 = "";
let newsLink3 = "";
let min = 0;
let max = 1000;
let currentStock = "";

class ProfilePage extends Component {
    state = {
    stocks,
    priceArray: [],
    title: "",
    timeline: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",],
    dayLimit: 30
  };

  componentDidMount() {

    //if logged in and trying to go to the login page redirect to profile page
    if(!this.props.auth.isAuthenticated){
      this.props.history.push('/')
    }
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
    if (stock) {
    currentStock = stock;
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

        let stockData = response.data[ticker];
        console.log(stockData);


        const priceArray = [];
        for ( let i = stockData.chart.length - this.state.dayLimit; i < stockData.chart.length; i++ ) {
          priceArray.push( stockData.chart[i].close );
        }

        news1 = stockData.news[0].headline;
        newsLink1 = stockData.news[0].url;

        news2 = stockData.news[1].headline;
        newsLink2 = stockData.news[1].url;

        news3 = stockData.news[2].headline;
        newsLink3 = stockData.news[2].url;

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
  }

  displayWeek = () => {
    let newArray = [];
    for (var i = 0; i <8 ; i++) {
      newArray.push(i)
    }
    this.setState({timeline: newArray,
  dayLimit: 7 })
    this.handleClick(currentStock.id);
  }

  displayMonth = () => {
    let newArray = [];
    for (var i = 0; i <31 ; i++) {
      newArray.push(i)
    }
    this.setState({timeline: newArray,
  dayLimit: 30 })
    this.handleClick(currentStock.id);
  }

  displayQuarter = () => {
    let newArray = [];
    for (var i = 0; i <91 ; i++) {
      if (i % 5 == 0) {
        newArray.push(i)
      } else {
        newArray.push("")
      }
    }
    this.setState({timeline: newArray,
  dayLimit: 90 })
    this.handleClick(currentStock.id);
  }

  displayYear = () => {
    let newArray = [];
    for (var i = 0; i <366 ; i++) {
      if (i % 25 == 0) {
        newArray.push(i)
      } else {
        newArray.push("")
      }
    }
    this.setState({timeline: newArray,
  dayLimit: 365 })
    this.handleClick(currentStock.id);
  }


  render() {
    return <div className="app">
        <NavBarTop />
        <div className="margin-top">
          <Navbar handleClick={this.handleClick} />

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
              displayQuarter={this.displayQuarter}
              displayYear={this.displayYear} />
            <div className="row">
              <News news1={news1} newsLink1={newsLink1} news2={news2} newsLink2={newsLink2} news3={news3} newsLink3={newsLink3} />
              <PieChart />
            </div>
          </Wrapper>
        </div>
      </div>;
}
}

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {})(ProfilePage);
