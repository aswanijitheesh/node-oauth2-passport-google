const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./credentials.js');
const User = require('./users.js')

passport.serializeUser(function (user, done) {
  console.log("User ID: " + user.id + " is serializing");
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("User ID: " + user.id + " is deserializing");
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOne({ googleId: profile.id }, function (err, user) {
      if (err) {
        return cb(err, false, { message: err });
      } else {
        if (user != '' && user != null) {
          return cb(null, user, { message: "User " });
        } else {
          var userData = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            created: Date.now()
          });
          userData.save(function (err, newuser) {
            if (err) {
              return cb(null, false, { message: err + " !!! Please try again" });
            } else {
              return cb(null, newuser);
            }
          });
        }
      }
    });
  }
));
