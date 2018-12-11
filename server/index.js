require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const strategy = require("./strategy");
const aws_upload = require("./controllers/aws_upload");
const ocr_controller = require("./controllers/ocr_controller");

const app = express();
const PORT = process.env.PORT;

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
  // done(null, {
  //   id: user.id,
  //   display: user.displayName,
  //   nickname: user.nickname,
  //   email: user.emails[0].value
  // });
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Enpoints

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
    // res.redirect("http://localhost:3000/dash")
    console.log("successful login with Auth0");
    res.status(200).send(JSON.stringify(req.user, null, 10));
  }
});

app.post("/upload", (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded");
  }

  const file = req.files.file;

  file.mv("./uploads/", function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});
// get google vision api key
// app.post("/api/transcript", ocr_controller.getText);

// aws
app.post("/api/aws", aws_upload.sign);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
