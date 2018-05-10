import axios from "axios";
import React, { Component } from "react";
import "./Title.css";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
  
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
            type="button"
            onClick={(event) => this.onSearchStockClick(this.state.ticker)}
          >
            Search
          </button>
        </form>
      </div>
    );
  }

  onSearchStockClick(stock) {
    this.props.stockSearchButtonClick(stock)
  }
}

export default Title;
