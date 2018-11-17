// use this to test uploading files

const uploadSuccess = [];

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//upload testing endpoints here
app.post("/api/uploads", (req, res, next) => {
  console.log(req.body);
  uploadSuccess.push(req.body);
  res.status(200).send({ success: true });
});

app.listen(3005, () => {
  console.log("listening on port 3005");
});
