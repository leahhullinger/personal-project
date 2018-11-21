require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const upload_helper = require("./controllers/fine_uploader");
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Enpoints
app.post("/uploads", upload_helper.onUpload);
app.delete("/uploads/:uuid", upload_helper.onDeleteFile);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
