const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const axios = require("axios");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config()

const db = require('./config/keys').mongoURI

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

//passport 
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

// Connect to the Mongo DB
mongoose
  .connect(process.env.MONGODB_URI || db)
  .then(() => console.log("MongooDB Connected"))
  .catch(err => console.log(err));

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});