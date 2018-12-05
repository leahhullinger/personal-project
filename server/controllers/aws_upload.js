const aws = require("aws-sdk");
require("dotenv").config();

aws.config.region = process.env.AWS_REGION || "us-east-2";

aws.config.credentials = new aws.Credentials({
  accessKeyID: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

exports = module.exports = {
  sign: (req, res, next) => {
    var filename = req.body.filename;
    var filetype = req.body.filetype;
    var s3 = new aws.S3();
    var params = {
      Bucket: process.env.BUCKET,
      Key: filename,
      ContentType: filetype
    };
    s3.getSignedUrl("putObject", params, function(err, data) {
      if (err) {
        console.log(err);
        return err;
      } else {
        res.status(200).send(data);
      }

  },
  upload: (req, res, next) => {
  
    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
      /*
       data = {
        ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
        VersionId: "tpf3zF08nBplQK1XLOefGskR7mGDwcDk"
       }
       */
      });
  
};
