import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import NavLinks from "./components/NavLinks";
import Title from "./components/Title";
import Graph from "./components/Graph";
import News from "./components/News";
import PieChart from "./components/PieChart";
import stocks from "./stocks.json";
import "./App.css";


let image = "./images/graph.png";
let title = "Stocks";
let priceArray =  [22.20, 34.90, 42.28, 51.93, 62.21, 82.12, 102.50, 107.23];

class App extends Component {
  state = {
    stocks
  };

  handleClick = id => {
    this.state.stocks.map(stock => (
      (stock.id === id) ? (image = stock.image, title = stock.title, priceArray = stock.priceArray) : null
    ))

    this.setState({stocks})
  }

  //axios 

  render() {
    return (
    <Router>
      <div className="container-fluid">
        <Navbar handleClick={this.handleClick}/>
        <Wrapper>
          <Title />
          <Graph
            title={title}
            priceArray={priceArray}
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
