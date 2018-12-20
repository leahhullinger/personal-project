module.exports = {
  saveOrigResponse: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { detectedText, upload_id } = req.body;

    dbInstance
      .save_orig_transcript(detectedText, upload_id, req.user.id)
      .then(response => {
        res.status(200).send("original response saved successfully.");
      })
      .catch(error => {
        console.log("error saving original transcript response", error);
      });
  },
  saveTranscript: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { detectedText, upload_id } = req.body;

    dbInstance
      .save_transcript(detectedText, upload_id, req.user.id)
      .then(response => {
        res.status(200).send("transcript saved successfully. ");
      })
      .catch(error => {
        console.log("error saving transcript", error);
      });
  },
  readTranscript: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;

    dbInstance
      .read_transcript(id, req.user.id)
      .then(transcript => {
        res.status(200).send(transcript);
      })
      .catch(error => {
        console.log("error getting transcript", error);
      });
  }
};
