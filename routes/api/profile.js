const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load user porfile
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   GET api/us/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    get current users profile
// @access  Private
router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {

})
// res.json({ msg: "Profile Works" }));


module.exports = router;
