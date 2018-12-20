const aws = require("aws-sdk");
require("dotenv").config();

aws.config.region = "us-east-2";

aws.config.credentials = new aws.Credentials(
  process.env.AWS_ACCESS_KEY,
  process.env.AWS_SECRET_KEY
);

exports = module.exports = {
  sign: function(req, res, next) {
    const filetype = req.body.filetype;
    const filename = req.body.filename;
    var s3 = new aws.S3({ signatureVersion: "v4" });
    var params = {
      Bucket: process.env.SOME_BUCKET,
      Key: filename,
      Expires: 100,
      ContentType: filetype
    };
    s3.getSignedUrl("putObject", params, function(err, data) {
      if (err) {
        console.log(err);
        return err;
      } else {
        res.status(200).send(data);
      }
    });
  },
  saveUploadInfo: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { filename, filetype, s3_url, post_id } = req.body;

    dbInstance
      .save_upload([filename, filetype, s3_url, post_id, req.user.id])
      .then(response => {
        console.log("saved upload");
        res.status(200).send("successfully saved");
      })
      .catch(error => {
        console.log("error saving upload info", error);
        res.status(500).send(error);
      });
  }
  // TODO add delete function
};
