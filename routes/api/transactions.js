const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../../models/Users");

// @route   GET api/us/test
// @desc    Test post route
// @access  Private
router.get("/test", (req, res) => res.json({
    msg: "transactions Works"
}));


router.post("/transaction", function (req, res) {
    console.log("*********Buy Transaction***********");
    
    // Needs purchase.tickerSelected & purchase.numberShares
    
    var purchase = req.body;
    console.log(purchase);
    var ticker = req.body.tickerSelected.toUpperCase();

    var parameters = {
        symbols: ticker,
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
            console.log("Ticker: " + ticker);
            // console.log(response);
            var purchasePrice = response.data[ticker].quote.close;
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

function updatePortfolio(studentID, transaction) {
    console.log("Update portfolio:");
    console.log(studentID);
    console.log(transaction);
  
    // Find the transaction Type
    var transactionType = transaction.transactionType;
  
    // Handle BUY requests - Further check to see if the stock already exists
    if (transactionType === 'buy') {
  
      // Look up student by id and returns the current portfolio
      db.Student.findById(studentID, function (err, doc) {
        var portfolio = doc.portfolio;
        // Create array of current tickers
        var currentTickers = [];
        // Cycle through portfolio to add all tickers to currentTickers
        for (let i = 0; i < portfolio.length; i++) {
          currentTickers.push(portfolio[i].ticker);
        }
        console.log("Current Portfolio:");
        console.log(currentTickers);
        console.log("Transaction Selected: Buy " + transaction.tickerSelected);
  
        for (let j = 0; j < currentTickers.length; j++) {
          if (transaction.tickerSelected === currentTickers[j]) {
            console.log(transaction.tickerSelected + " is already in your portfolio! Adding shares.")
            return buyexisting(studentID, transaction)
          }
        }
        // If it gets here, the stock was not in your portfolio and a new entry must be created
        console.log("Running buy new stock function...");
        return buynew(studentID, transaction)
      });
  
    }
    if (transactionType === 'sell') {
      // Look up student by id and returns the current portfolio
      db.Student.findById(studentID, function (err, doc) {
        var portfolio = doc.portfolio;
        // Create array of current tickers
        var currentTickers = [];
        // Cycle through portfolio to add all tickers to currentTickers
        for (let i = 0; i < portfolio.length; i++) {
          currentTickers.push(portfolio[i].ticker);
        }
        console.log("Current Portfolio:");
        console.log(currentTickers);
        console.log("Transaction Selected: Buy " + transaction.tickerSelected);
  
        for (let j = 0; j < currentTickers.length; j++) {
          if (transaction.tickerSelected === currentTickers[j]) {
            console.log(transaction.tickerSelected + " is in your portfolio.");
            console.log("You have " + doc.portfolio[j].numberShares + " shares");
            if (doc.portfolio[j].numberShares >= transaction.numberShares) {
              console.log("You have " + doc.portfolio[j].numberShares + " shares");
              console.log("You are selling " + transaction.numberShares + " shares");
              return sellexisting(studentID, transaction)
            } else {
              console.log("Cannot sell more shares than you own!");
            }
  
          }
        }
        // If it gets here, the stock was not in your portfolio and a new entry must be created
        console.log("Cannot Sell! " + transaction.tickerSelected + " is not in your portfolio!");
        return;
      });
    }
  
  
  }
  
  // Handles buying a stock you already own
  function buyexisting(studentID, transaction) {
    console.log("Adding to existing stock owned")
  
    db.Student.findById(studentID, function (err, doc) {
  
      for (let i = 0; i < doc.portfolio.length; i++) {
        if (doc.portfolio[i].ticker === transaction.tickerSelected) {
          var valueArray = doc.portfolio[i].value;
          console.log(valueArray);
          // Create array of transaction values
          var newArray = valueArray;
          newArray.push(transaction.totalCost);
          console.log(newArray);
          // Sum values in array to add new Total Value
          var totalValue = newArray.reduce(function (acc, val) {
            return acc + val;
          });
          var numberShares = doc.portfolio[i].numberShares;
          numberShares = numberShares + transaction.numberShares;
  
          // Update the whole object with total cost, average cost, and number shares
          db.Student.update({
              _id: studentID,
              "portfolio.ticker": transaction.tickerSelected
            }, {
              $set: {
                "portfolio.$.value": newArray,
                "portfolio.$.totalValue": totalValue,
                "portfolio.$.numberShares": numberShares
              },
              $inc: {
                "cash": -transaction.totalCost
              }
            }).then(function (dbStudent) {
              // Do Something
            })
            .catch(function (err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
        }
      }
    });
  }
  
  // Creates new transaction in Student Portfolio 
  function buynew(studentID, transaction) {
  
    console.log("Add new Stock to the portfolio");
  
    db.Student.findOneAndUpdate({
        _id: studentID
      }, {
        $push: {
          portfolio: {
            ticker: transaction.tickerSelected,
            value: transaction.totalCost,
            numberShares: transaction.numberShares,
            totalValue: transaction.totalCost,
            avargeCost: (transaction.totalCost / transaction.numberShares)
          }
        },
        $inc: {
          "cash": -transaction.totalCost
        }
      }).then(function (dbStudent) {
        // Do Something
        console.log("getting to here?");
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        console.log("Error buying new stock");
        return res.json(err);
      });
  }
  
  
  function sellexisting(studentID, transaction) {
    console.log("SELLING SHARES")
  
    db.Student.findById(studentID, function (err, doc) {
  
      for (let i = 0; i < doc.portfolio.length; i++) {
        if (doc.portfolio[i].ticker === transaction.tickerSelected) {
          var valueArray = doc.portfolio[i].value;
          console.log(valueArray);
          // Create array of transaction values
          var newArray = valueArray;
          newArray.push(-transaction.totalCost);
          console.log(newArray);
          // Sum values in array to add new Total Value
          var totalValue = newArray.reduce(function (acc, val) {
            return acc + val;
          });
  
          var numberShares = doc.portfolio[i].numberShares;
          numberShares = numberShares - transaction.numberShares;
  
          // Update the whole object with total cost, average cost, and number shares
          db.Student.update({
              _id: studentID,
              "portfolio.ticker": transaction.tickerSelected
            }, {
              $set: {
                "portfolio.$.value": newArray,
                "portfolio.$.totalValue": totalValue,
                "portfolio.$.numberShares": numberShares
              },
              $inc: {
                "cash": transaction.totalCost
              }
            }).then(function (dbStudent) {
              // Do Something
            })
            .catch(function (err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
        }
      }
    });
  
  }

module.exports = router;