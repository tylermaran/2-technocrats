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

class App extends Component {
  state = {
    stocks
  };

  handleClick = id => {
    this.state.stocks.map(stock => (
      (stock.id === id) ? image = stock.image : null
    ))

    this.setState({stocks})
  }

  render() {
    return (
    <Router>
      <div className="container-fluid">
        <Navbar handleClick={this.handleClick}/>
        <Wrapper>
          <Title />
          <Graph
            image={image}
          />
          <div className="row">
            <News />
            <PieChart />
          </div>
        </Wrapper>
      </div>
    </Router>
  );
}
}

export default App;
