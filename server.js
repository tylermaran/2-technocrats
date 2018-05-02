const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
var axios = require("axios");
const PORT = process.env.PORT || 3001;
 
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
// app.use(routes);


// Lookup data for chart
app.get("/chart/:ticker", function (req, res) {
  console.log("*********Chart Lookup***********");
  var ticker = req.params.ticker;
  ticker = ticker.toUpperCase();
  console.log(ticker);
  var parameters = {
    symbols: req.params.ticker,
    types: 'chart,news',
    range: '1y',
    last: '5'
  }
  //  Pull stock data based on parameters
  axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0//stock/market/batch',
      params: parameters,
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    .then(function (response) {
      var sourceData = response.data;
      var chartArray = []
      for (let index = 0; index < sourceData[ticker].chart.length; index++) {
        var chartValue = {
          date: sourceData[ticker].chart[index].date,
          value: sourceData[ticker].chart[index].close,
        }
        chartArray.push(chartValue);
      }
      var returnObject = {
        price: chartArray,
        news: sourceData[ticker].news
      }
      console.log(returnObject);
      return res.json(response.data);
    });
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tsi");

//Use Routes
app.use('/api/users', users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);


// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});