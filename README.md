# Google Authentication with Passport.js using Auth2.0 
 
 ## technologies:

    1.Node.js(v12.18.3) 
    2.Express.js 
    3.npm(6.14.6)
    4.HTML(View)
    
## description:

This application provides strategy for authenticating with Google
using the `passport-google-oauth20` module.

## build 

1. Create a new folder called `oauth-nodejs-project` for your Node.js service.

2. Open command promit of the folder and run command `npm init` to create a package.json file.

3. Add Express as a dependency by running:

    `npm install express --save`

4. Create a file named `server.js`.

5. Set view engine for rendering HTML pages.

6. set `cookie-session` and `body-parser`.

7. Install dependencies  and check the server is listing into port `3000`.

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
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
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
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```
### Add *oauth.js* file to the rootand add client id and client key

  ```js
  var credentials = {
    google: {
      clientID: 'get_google_id',
      clientSecret: 'get_google_client_secret',
      callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
    },
  };

  module.exports = credentials;
```
### Run server

 1. Run the server by using command in node terminal
    
    npm start server.js

