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

const { DOMAIN, CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } = process.env;

const app = express();
const PORT = process.env.PORT;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.DB_CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(error => console.log(error));

passport.use(
  new Auth0Strategy(
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
  )
);
// determines which data of the user obj to store in session
// req.session.passport.user
passport.serializeUser(function(user, done) {
  console.log("user in serialize function", user);
  done(null, user);
});
// to retrieve whole object using user.id
passport.deserializeUser(function(user, done) {
  console.log("user in deserialize:", user);
  done(null, user);
  // const dbInstance = app.get("db");
  // const { id } = user;
  // dbInstance
  //   .find_session_user([id])
  //   .then(user => {
  //     return done(null, user);
  //   })
  //   .catch(error => {
  //     console.log("error with deserialize", error);
  //   });
});
// auth endpoints
// app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/dash",
    failureRedirect: "http://localhost:3000/"
  })
);
app.get("/dash", (req, res, next) => {
  req.session.user = req.user;
  console.log("hitting /dash");
  if (!req.user) {
    return res.status(401).send("Log in required");
  } else {
    res.status(200).send(req.session.user);
  }
});

// Folder Endpoints
app.post("/api/add/folder", dc.createFolder);
app.get("/api/folder", dc.readFolder);
app.get("/api/folders", dc.getFolders);
app.delete("/api/folder/:id", dc.deleteFolder);
app.put("/api/edit/folder/:id", dc.updateFolderName);

// File Endpoints
app.post("/api/add/file", dc.newPost);
app.get("/api/file", dc.readPost);
app.get("/api/files", dc.readPosts);
app.delete("/api/file/:id", dc.deletePost);
app.put("/api/file/:id", dc.updatePost);

// text detect from img -- AWS Rekognition Detect Text API
app.post("/api/transcript", textDetect_controller.transcript);

// file upload -- AWS S3
app.post("/api/aws", aws_upload.sign);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
