# Google Authentication with Passport.js using Auth2.0 
 
 ## technologies:

    1.Node.js(v12.18.3) 
    2.Express.js 
    3.npm(6.14.6)
    4.HTML(View)
    
## description:

This application provides strategy for authenticating with Google
using the `passport-google-oauth20` module.

### build 

1. Add Express as a dependency by running:

    `npm install express`

### Run server

 1. Run the server by using command in node terminal
    
    npm start server.js
  
2. Server starts listening in port 3000.

### passport google authentication

1. Add dependcy `passport-google-oauth20`.

2.  Register your application with the google OAuth provider. 

### Create an application in google
1. Add content to the consent screen like title and logo.
2. Add credentials, specifically an OAuth 2.0 client ID.
3. Choose the "Web application" type and give it a name.
4. Enter the URIs that are allowed to be redirect-URIs.
5. Google then gives you a client-id and secret that you will need to record and use in your web and server code.

### Configure Strategy

1. The Google authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The client ID and secret key  obtained when creating an application.
2. Google has to do a verification callback, using access token and optional refresh token,as well as profile which contains authenticated user's Google profile. The verify callback must call done providing a user to complete authentication.

```js
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
     clientID: config.google.clientID,
     clientSecret: config.google.clientSecret,
     callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      return done(err, user);
  }
));
```
###  Authentication

1.Use `passport.authenticate()`, specifying the 'google' strategy, to authenticate requests.

```js
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect account.
    res.redirect('/account');
  });
```
### Add Google clientID and clientSecret in credentials.js page.
  ```js
  var credentials = {
    google: {
      clientID: 'get_google_id',
      clientSecret: 'get_google_client_secret',
      callbackURL: 'http://example.com/auth/google/callback'
    },
  };

  module.exports = credentials;
```

