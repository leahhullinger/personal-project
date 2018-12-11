const Auth0Strategy = require("passport-auth0");
const AWS = require("aws-sdk");

const { DOMAIN, CLIENT_ID, CLIENT_SECRET, AWS_ACCESS_KEY } = process.env;

const strategy = new Auth0Strategy(
  {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3005/auth",
    scope: "openid email profile"
  },

  function(sessionToken, refreshToken, extraParams, profile, done) {
    console.log(extraParams.id_token);
    try {
      // Initialize the Amazon Cognito credentials provider
      AWS.config.region = "us-east-1"; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.IDENTITY_POOL_ID,
        Logins: {
          "citizen-sidekick.auth0.com": extraParams.id_token // id_token
        }
      });
      console.log(AWS.config.credentials);
      AWS.config.credentials.get(function(err) {
        if (err) {
          console.log("error getting credentials", err);
        }
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
        var identityId = AWS.config.credentials.params.IdentityId; //double check on if needed
        // place this info on sessions to access when uploading
        return {
          accessKeyId,
          secretAccessKey,
          sessionToken,
          identityId
        };
        console.log("you win");
      });
    } catch (err) {
      console.log("something went wrong with aws", err);
    }
  }
);

module.exports = strategy;

// {
//   "Version": "2012-10-17",
//   "Statement": [
//     {
//       "Effect": "Allow",
//       "Action": ["s3:ListBucket"],
//       "Resource": ["arn:aws:s3:::citizen-sidekick"],
//       "Condition": {"StringLike": {"s3:prefix": ["Auth0/my-upload-app/${citizen-sidekick.auth0.com:sub}/*"]}}
//     },
//     {
//       "Effect": "Allow",
//       "Action": [
//         "s3:GetObject",
//         "s3:PutObject",
//         "s3:DeleteObject"
//       ],
//       "Resource": [
//         "arn:aws:s3:::citizen-sidekick/Auth0/citizen-sidekick/${citizen-sidekick.auth0.com:sub}",
//         "arn:aws:s3:::citizen-sidekick/Auth0/citizen-sidekick/${citizen-sidekick.auth0.com:sub}/*"
//       ]
//     }
//   ]
// }
