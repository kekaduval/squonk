const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require("./routes");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sqonk";

mongoose.Promise = global.Promise;


mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});


