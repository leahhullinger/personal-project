require("dotenv").config();
// Imports the Google Cloud client library.
const { Storage } = require("@google-cloud/storage");
const { Compute } = require("google-auth-library");
const { keyFilename, projectId } = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md

const storage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
});

await storage.bucket("citizen-sidekick").upload(filename, {});

async function main() {
  const client = new Compute();

  const res = await client.request({ url });
  console.log(res.data);
}

main().catch(console.error);
