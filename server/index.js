require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const strategy = require("./strategy");
const aws_upload = require("./controllers/aws_upload");

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
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

app.get("/auth", passport.authenticate("auth0"));

passport.serializeUser(function(user, done) {
  done(null, {
    id: user.id,
    display: user.displayName,
    nickname: user.nickname,
    email: user.emails[0].value
  });
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Enpoints
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/dash",
    failureRedirect: "/login",
    failureFlash: false
  })
);

app.get("/callback", (req, res) => {
  res.send("made it");
});
// aws
app.post("/api/aws", aws_upload.sign);
// app.post("/uploads", fine_uploader.onUpload);
// app.delete("/uploads/:uuid", fine_uploader.onDeleteFile);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
