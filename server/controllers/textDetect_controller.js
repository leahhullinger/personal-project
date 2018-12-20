require("dotenv").config();
const AWS = require("aws-sdk");
const Rekognition = require("node-rekognition");

exports = module.exports = {
  transcript: (req, res) => {
    const { file } = req.body;

    var rekognition = new AWS.Rekognition({
      endpoint: "https://rekognition.us-east-2.amazonaws.com",
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKay: process.env.AWS_SECRET_KEY,
      apiVersion: "2016-06-27"
    });

    var params = {
      Image: {
        /* required */
        S3Object: {
          Bucket: process.env.SOME_BUCKET,
          Name: file
        }
      }
    };

    rekognition.detectText(params, function(err, data) {
      if (err) {
        console.log("there was an error transcripting", err, err.stack); // an error occurred
      } else {
        const fullResults = data.TextDetections.map(
          line => line.DetectedText
        ).join(" ");
        res.status(200).send(fullResults); // successful response
      }
    });
  }
};
