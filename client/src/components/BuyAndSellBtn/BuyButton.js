import "./button.css";
import React, { Component } from "react";
let axios = require("axios");

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class BuyButton extends Component {

  componentDidMount() {
    const auth = localStorage.getItem("jwtToken");

    axios({
        method: 'GET',
        url: '/api/users/current',
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: auth
        }
      })
      .then((response) => {

        // let stockData = response.data['AAPL'];
        console.log(response.data);
        this.setState({
          student: response.data
        });
      }).catch(response => {
        console.log(response);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      shares: 0,
      student: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return <div className="input-group mb-3 justify-content-center">
        <div style={{ height: "40px", width: "60px" }} className="input-group-prepend ">
          <button style={{ margin: "0px", height: "100%" }} className="btn btn-outline-success" type="button"
          onClick={(event) => this.buyStock("MSFT", this.state.shares)}>
            Buy
          </button>
        </div>
          <input type="number" 
            onChange={this.onChange}
            name="shares"
            value={this.state.shares}
            className="form-control col-4" 
            placeholder="# Shares" 
            aria-label="" 
            min="0" max = "1000" 
            aria-describedby="basic-addon1" />
        </div>;
  }


buyStock(ticker, shares) {
  console.log(ticker)
  console.log(shares)
  const auth = localStorage.getItem("jwtToken");

  var transaction = {
    type: 'buy',
    numberShares: shares,
    tickerSelected: ticker
  }

  axios({
      method: 'POST',
      url: '/api/transactions/transaction/' + this.state.student._id,
      data: transaction,
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: auth
      }
    })
    .then((response) => {
      console.log(`buying: ${response}`);
    }).catch(err => {
      console.log(err);
    });

}

}

export default BuyButton;