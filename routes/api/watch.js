const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({
    msg: "buying Works"
}));

// Adds to watch list, takes in student id as param
router.post("/watch/:id", function (req, res) {
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


module.exports = router;