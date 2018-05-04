const express = require("express");
const router = express.Router();

// @route   GET api/us/test
// @desc    Test post route
// @access  Private
router.get("/test", (req, res) => res.json({
    msg: "buying Works"
}));


router.post("/buy/:id", function (req, res) {
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

module.exports = router;