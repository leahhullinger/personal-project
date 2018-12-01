const aws = require("aws-sdk");
require("dotenv").config();

aws.config.region = "us-east"; // correct Region

aws.config.credentials = new aws.Credentials(
  process.env.AWS_ACCESS_ID,
  process.env.AWS_SECRET_KEY
);

module = module.exports = {
  sign: function(req, res, next) {
    console.log("made it", req.body);
    var filename = req.body.filename;
    var filetype = req.body.filetype;
    var s3 = new aws.S3();
    var params = {
      Bucket: process.env.AWS_BUCKET, // add my bucket name
      Key: filename,
      Expires: 60,
      ContentType: filetype
    };
    s3.getSignedUrl("putObject", params, function(err, data) {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log("file added");
        res.status(200).send(data);
      }
    });
  }
};
