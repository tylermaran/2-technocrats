import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Graph from "./components/Graph";
import News from "./components/News";
import PieChart from "./components/PieChart";
import "./App.css";


class App extends Component {

  // Map over this.state.pics and render a PicCard component for each pic object
  render() {
    return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <Wrapper>
          <Title />
          <Graph />
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
