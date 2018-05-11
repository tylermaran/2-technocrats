import React, { Component } from "react";
import "./Title.css";
let axios = require("axios");

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
            onKeyDown={
              (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  this.onSearchStockClick(this.state.ticker);
                }}}
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
  console.log("Stock is:");
  console.log(stock);
  const auth = localStorage.getItem("jwtToken");
  var transaction = {
    type: 'buy',
    numberShares: 1,
    tickerSelected: stock
  }
  axios({
      method: 'POST',
      url: '/api/transactions/transaction',
      data: transaction,
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: auth
      }
    })
    .then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
}


}

export default Title;
