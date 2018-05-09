import axios from "axios";
import React, { Component } from "react";
import "./Title.css";

class Title extends Component {
  constructor() {
    super();
    this.state = {
      ticker: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSearchStockClick = this.onSearchStockClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    // axios.get("/api/students/test").then(response => console.log(response));
  }

  onSearchStockClick(e) {
    e.preventDefault();
    //  Pull stock data based on parameters
    var parameters = {
      symbols: this.state.ticker,
      types: "chart,news",
      range: "1y",
      last: "5"
    };
    axios({
      method: "GET",
      url: "/api/search/search",
      params: parameters
    }).then(response => {
      console.log(response)
    });
    console.log("searched");
  }

  render() {
    return (
      <div className="row">
        <div className="col-7 title">Student Portfolio</div>
        <form className="col-5 form-inline">
          <input
            className="form-control mr-sm-2"
            onChange={this.onChange}
            name="ticker"
            value={this.state.ticker}
            placeholder="Search Stocks"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={this.onSearchStockClick}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Title;
