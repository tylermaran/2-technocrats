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
let news = "Bacon ipsum dolor amet short loin turducken ribeye doner frankfurter salami pastrami turkey sirloin bacon. Cupim ham chuck, filet mignon tail shoulder meatball jowl frankfurter shank. Beef ribs short ribs ham kielbasa sausage filet mignon flank pork chop meatloaf venison jerky. Burgdoggen pancetta meatloaf tenderloin pork leberkas. Corned beef frankfurter fatback flank burgdoggen landjaeger alcatra bresaola."

class App extends Component {
  state = {
    stocks
  };

  handleClick = id => {
    this.state.stocks.map(stock => (
      (stock.id === id) ? (image = stock.image, news = stock.news) : null
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
