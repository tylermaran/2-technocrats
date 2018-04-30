const express = require("express");
const router = express.Router();

// @route   GET api/us/test
// @desc    Test post route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

module.exports = router;
