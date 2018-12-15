require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const strategy = require("./strategy");

const aws_upload = require("./controllers/aws_upload");
const textDetect_controller = require("./controllers/textDetect_controller");

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
passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// auth endpoints
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "/dash",
    failureRedirect: "/auth",
    failureFlash: true
  })
);
app.get("/dash", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth");
  } else {
    console.log("successful login with Auth0");
    res.status(200).send(JSON.stringify(req.user, null, 10));
  }
});

// text detect from img -- AWS Rekognition Detect Text API
app.post("/api/transcript", textDetect_controller.transcript);

// file upload -- AWS S3
app.post("/api/aws", aws_upload.sign);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
