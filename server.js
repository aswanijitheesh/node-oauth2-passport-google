const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes');
const bodyParser = require('body-parser')
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const config = require('./credentials.js');
const User = require('./users.js');
require('./authentication');

// connect to the database
mongoose.connect('mongodb://127.0.0.1/oauth2-pasport-google')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

const isLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401)
    }
}

app.use(passport.initialize())
app.use(passport.session())

app.get('/', routes.index)
app.get('/error', function (req, res, err) { res.send('You are not able to login!' + err) })

app.get('/account', isLoggedIn, function (req, res) { res.render('account', { user: req.user }) })

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        console.log("Logged in")
        res.redirect('/account')
    }
);

app.get('/logout', function (req, res) {
    req.session = null;
    req.logout();
    console.log("Logged out")
    res.redirect('/')
})

module.exports = app.listen(3000, function () { console.log(`Server listening on port ${3000}`) })