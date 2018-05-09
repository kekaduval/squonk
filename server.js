const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require("./routes");
const db = require("./models");
const app = express();

const PORT = process.env.PORT || 3001;

// app.get('/', (req, res) => res.sendFile('auth.html', { root: __dirname }));


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets





/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome " + req.query.username + "!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user);
    });
});



/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDetails.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

app.post('/',
    passport.authenticate('local', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/success?username=' + req.user.username);
    });

// app.use(function(req, res, next) {
//     if (!req.user) {
//         res.sendFile('auth.html', { root: __dirname })
//     }
//     next()
// })

app.use(routes);
app.use(express.static("client/build"));
// Add routes, both API and view

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/squonk";

mongoose.Promise = global.Promise;


mongoose.connect(MONGODB_URI);
// Start the server PORT
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});









