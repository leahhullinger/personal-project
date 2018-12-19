require("dotenv").config();
const Auth0Strategy = require("passport-auth0");

const { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;
const strategy = new Auth0Strategy(
  {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "/auth",
    scope: "openid email profile"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    const dbInstance = app.get("db");
    const { id } = profile;
    const email = profile.emails[0].value;
    if (profile) {
      dbInstance.find_user([id]).then(results => {
        console.log("find user results", results);
        let user = results[0];
        return done(null, user);
      });
    } else {
      dbInstance
        .create_user([id, email])
        .then(results => {
          console.log("create user results", results);
          let user = results[0];
          return done(null, user);
        })
        .catch(error => console.log("error", error));
    }
  }
);

module.exports = strategy;
