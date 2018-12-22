module.exports = {
  newFile: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    const {
      title,
      date,
      notes,
      filename,
      filetype,
      s3_url,
      transcript,
      folder_id
    } = req.body;
    dbInstance
      .new_upload(
        title,
        date,
        notes,
        filename,
        filetype,
        s3_url,
        transcript,
        folder_id,
        req.user.id
      )
      .then(file => {
        console.log("this is new upload response", file);
        res.status(200).send(file);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  readFile: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    dbInstance
      .read_file(id, req.user.id)
      .then(file => {
        res.status(200).send(file);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  readFiles: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .read_files(req.user.id)
      .then(files => {
        res.status(200).send(files);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ errorMessage: "error getting files" });
      });
  },

  updateFile: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    const { title, date, notes } = req.body;

    dbInstance
      .update_file(title, date, notes, id, req.user.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error updating file" });
        console.log(err);
      });
  },

  deleteFile: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req;

    dbInstance
      .delete_file(id, req.user.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error deleting file" });
        console.log(err);
      });
  }
};
