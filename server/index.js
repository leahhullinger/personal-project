require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const massive = require("massive");
const strategy = require("./strategy");

// controllers
const file = require("./controllers/file_controller");
const transcript = require("./controllers/transcript_controller");
const upload = require("./controllers/upload_controller");
const folder = require("./controllers/folder_controller");
const aws_td = require("./controllers/textDetect_controller");

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

passport.use(strategy);

// determines which data of the user obj to store in session
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// AUTH ENDPOINTS
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

// FOLDER ENDPOINTS
app.post("/api/add/folder", folder.createFolder);
app.get("/api/folder/:id", folder.readFolder);
app.get("/api/folders", folder.getFolders);
app.delete("/api/folder/:id", folder.deleteFolder);
app.put("/api/folder/:id", folder.updateFolderName);

// FILE ENDPOINTS
app.post("/api/add/post", file.newFile);
app.get("/api/post/:id", file.readFile);
app.get("/api/posts", file.readFiles);
app.delete("/api/post/:id", file.deleteFile);
app.put("/api/post/:id", file.updateFile);

// UPLOAD ENDPOINTS
app.post("/api/aws", upload.sign); // s3 upload
app.post("/api/save/info", upload.saveUploadInfo); // hit this right after s3 response

// TRANSCRIPT ENDPOINTS
app.post("/api/textDetect", aws_td.transcript); // aws rekognition textDetect, 1st
app.get("/api/transcript/:id", transcript.readTranscript);
app.post("/api/textDetect/response", transcript.saveOrigResponse); // 2nd
app.post("/api/save/transcript", transcript.saveTranscript); // 3rd

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
