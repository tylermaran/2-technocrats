var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var axios = require("axios");

// Require all models (looks to index.js in models folder)
var db = require("./models");
var PORT = 5000;

// Initialize Express
var app = express();

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Use morgan logger for logging requests
app.use(logger("dev"));

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stocktraderdb", {});

// parse application/json
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// Search for Specific ticker - return JSON file
app.get("/api/:ticker?", function (req, res) {
  var ticker = req.params.ticker;
  console.log("API Lookup: " + ticker);
  var parameters = {
    symbols: ticker,
    types: 'quote,news,chart',
    range: '1m',
    last: '5'
  }
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

// Buy route: Intiates a buy transaction. Takes in student id
app.post("/buy/:id", function (req, res) {
  console.log("*********Buy Transaction***********");
  var purchase = req.body;
  console.log(purchase);

  var parameters = {
    symbols: req.body.tickerSelected,
    types: 'quote,news,chart',
    range: '1m',
    last: '5'
  }

  // When buying, does a last minute price check on the stock
  axios({
      method: 'GET',
      url: 'https://api.iextrading.com/1.0//stock/market/batch',
      params: parameters,
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    .then(function (response) {
      console.log("Ticker: " + purchase.tickerSelected);
      var purchasePrice = response.data[purchase.tickerSelected].quote.close;
      console.log("Purchase Price" + purchasePrice);
      purchase.totalCost = purchasePrice * purchase.numberShares;
      var studentID = req.params.id;
      res.json(response.data);

      // Looks up student with id = req.params.id
      console.log(req.params.id);
      db.Student.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: {
            transaction: purchase
          }
        }).then(function (dbStudent) {
          // View the added result in the console
          console.log(dbStudent);
          updatePortfolio(studentID, purchase)
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });
});

// Adds to watch list, takes in student id as param
app.post("/watch/:id", function (req, res) {
  console.log("******** Watch List ************");
  var watchlist = req.body;

  // looks for student id in db.Student and adds ticker to watch list
  db.Student.findOneAndUpdate({
      _id: req.params.id
    }, {
      $push: {
        watchlist: watchlist
      }
    }).then(function (dbStudent) {
      // View the added result in the console
      console.log(dbStudent);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });
});

// Create new student (currently using dummy data)
app.get("/newstudent", function (req, res) {
  console.log("Adding new student");
  var student = {
    studentName: "John J. Schmit",
    firstName: "John",
    lastName: "Schmit",
    classNumber: 1337,
    cash: 10000
  }
  db.Student.create(student)
    .then(function (dbStudent) {
      // View the added result in the console
      return console.log(dbStudent);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });
})

// Lookup all students
app.get("/students", function (req, res) {
  // Lookup all students. To filter by class, add a function here
  db.Student.find({}).sort({
      "_id": -1
    })
    .then(function (dbStudent) {
      res.json(dbStudent);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Takes in transactions and updates the student portfolio
function updatePortfolio(id, transaction) {
  console.log("Update portfolio: " + id)
  console.log(transaction);

}


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
      res.json(response.data);
    });
});

// Start the server
app.listen((process.env.PORT || 5000), function () {
  console.log("App running on port " + PORT + "!");
});