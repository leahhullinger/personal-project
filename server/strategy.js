const Auth0Strategy = require("passport-auth0");

const { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

const strategy = new Auth0Strategy(
  {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3000/dash",
    scope: "openid email profile"
  },

  function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get("db");
    db.get_user_by_fb_id({ fb_id: profile.id }).then(results => {
      let user = results[0];

      if (user) {
        return done(null, user);
      } else {
        let userObj = {
          display_name: profile.displayName,
          fb_id: profile.id,
          img_url: profile.picture,
          email: profile.emails[0].value
        };

        db.create_user(userObj)
          .then(results => {
            let user = results[0];
            return done(null, user);
          })
          .catch(error => console.log("error", error));
      }
    });
  }
);

module.exports = strategy;
