// require("dotenv").config();
// const vision = require("@google-cloud/vision");
// Creates a client

// const client = new vision.ImageAnnotatorClient({
//   projectId: "citzen-sidekick",
//   keyFileName: "../gcloud_cred.json"
// });
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
module.exports = {
  transcript: (req, res, next) => {
    const request = require("request");
    const fs = require("fs");
    const url = "http://tesseract.projectnaptha.com/img/eng_bw.png";
    const filename = "pic.png";

    const writeFileStream = fs.createWriteStream(filename);

    request(url)
      .pipe(writeFileStream)
      .on("close", function() {
        console.log(url, "saved to", filename);
      });
  },

  textExtract: (req, res, next) => {
    const { imageURL } = req.body;

    // Performs text detection on the local file
    client
      .textDetection(imageURL)
      .then(results => {
        const imageTranscript = results[0].fullTextAnnotation;
        console.log("Text:", imageTranscript);
        res.status(200).send(textTranscript);
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  }
};
