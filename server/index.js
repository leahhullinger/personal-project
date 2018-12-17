require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");
// const strategy = require("./strategy");

// controllers
const dc = require("./controllers/data_controller");
const aws_upload = require("./controllers/aws_upload");
const textDetect_controller = require("./controllers/textDetect_controller");

const { DOMAIN, CLIENT_ID, CLIENT_SECRET, AWS_ACCESS_KEY } = process.env;

massive(process.env.DB_CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(error => console.log(error));

const app = express();
const PORT = process.env.PORT;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/auth/callback",
      scope: "openid email profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");
      db.get_user({ id: profile.id }).then(results => {
        let user = results[0];

        if (user) {
          return done(null, user);
        } else {
          // let userObj = {
          //   id: profile.id,
          //   user_name: profile.displayName,
          //   email: profile.emails[0].value
          // };
          let userInfo = [
            profile.id,
            profile.displayName,
            profile.emails[0].value
          ];
          db.new_user(userInfo)
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

// access user object here => req.session.passport.user
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// auth endpoints
app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "/dash",
    failureRedirect: "/"
  })
);
app.get("/dash", (req, res, next) => {
  console.log("hitting this shit");
  if (!req.user) {
    res.redirect("/auth");
  } else {
    res.status(200).send(JSON.stringify(req.user, null, 10));
  }
});

// Folder Endpoints
app.post("/api/add/folder", dc.createFolder);
app.get("/api/folder/:id", dc.getFolderOne);
app.get("/api/folders", dc.getFolderAll);
app.delete("/api/folder/:id", dc.deleteFolder);
app.put("/api/edit/folder/:id", dc.updateFolder);

// File Endpoints
app.post("/api/add/file", dc.newFile);
app.get("/api/file/:id", dc.getFileOne);
app.get("/api/files", dc.getFiles);
app.delete("/api/file/:id", dc.deleteFile);
app.put("/api/file/:id", dc.updateFile);

// text detect from img -- AWS Rekognition Detect Text API
app.post("/api/transcript", textDetect_controller.transcript);

// file upload -- AWS S3
app.post("/api/aws", aws_upload.sign);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
