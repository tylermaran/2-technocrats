var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");


// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");

// Require all models
var db = require("./models");
var PORT = 5000;

// Initialize Express
var app = express();

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Use morgan logger for logging requests
app.use(logger("dev"));

// By default mongoose uses callbacks for async queries, we're setting it to 
// use promises (.then syntax) instead

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stocktraderdb", {});

// parse application/json
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// Search for Specific ticker - provides JSON
app.get("/api/:ticker?", function (req, res) {
  var ticker = req.params.ticker;
  console.log(ticker);

  var parameters = {
    symbols: ticker,
    types: 'quote,news,chart',
    range: '1m',
    last: '5'
  }

  console.log(parameters);

  axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0//stock/market/batch',
      params: parameters,
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    .then(function (response) {

      res.json(response.data);
    });
});


// Route for getting all Articles from the db
app.get("/transactions", function (req, res) {
  // Grab every document in the Articles collection
  db.Transaction.find({}).sort({
      "_id": -1
    })
    .then(function (dbTransaction) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbTransaction);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });

});

// Route for saving/updating an Article's associated Note
app.post("/buy", function (req, res) {
  console.log("********************");
  var purchase = req.body;
  console.log(purchase);

  var parameters = {
    symbols: req.body.tickerSelected,
    types: 'quote,news,chart',
    range: '1m',
    last: '5'
  }

  console.log(parameters);

  axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0//stock/market/batch',
      params: parameters,
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    .then(function (response) {
      console.log(purchase.tickerSelected);
      var purchasePrice = response.data[purchase.tickerSelected].quote.close;
      console.log(purchasePrice);
      purchase.totalCost =  purchasePrice*purchase.numberShares;


      res.json(response.data);
      db.Transaction.create(purchase)
        .then(function (dbTransaction) {
          // View the added result in the console
          console.log(dbTransaction);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

});

// Start the server
app.listen((process.env.PORT || 5000), function () {
  console.log("App running on port " + PORT + "!");
});