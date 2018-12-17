const db = app.get("db");
db.get_user({ fb_id: profile.id }).then(results => {
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


// this one here
function(accessToken, refreshToken, extraParams, profile, done) {
  const db = app.get("db");
  db.get_user({ id: profile.id }).then(results => {
    let user = results[0];

    if (user) {
      return done(null, user);
    } else {
      let userObj = {
        id: profile.id,
        user_name: profile.displayName,
        email: profile.emails[0].value
      };
      // let userInfo = [
      //   profile.id,
      //   profile.displayName,
      //   profile.emails[0].value
      // ];
      db.new_user(userObj)
        .then(results => {
          let user = results[0];
          return done(null, user);
        })
        .catch(error => console.log("error", error));
    }
    return done(null, profile);
  });
}
)
);
