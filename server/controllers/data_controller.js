module.exports = {
  // Folders
  createFolder: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.session.user;
    const { name } = req.body;

    dbInstance
      .create_folder(name, id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error creating folder" });
        console.log(err);
      });
  },
  getFolderOne: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;

    dbInstance
      .get_folder(id)
      .then(folder => {
        res.status(200).send(folder);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error getting folder" });
        console.log(err);
      });
  },
  getFolderAll: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // const user_id = req.params;

    dbInstance
      .get_folder_all()
      .then(folders => {
        res.status(200).send(folders);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error getting folders" });
        console.log(err);
      });
  },
  deleteFolder: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .delete_folder(params.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error deleting folder" });
        console.log(err);
      });
  },
  updateFolder: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .update_folder(params.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error update folder" });
        console.log(err);
      });
  },

  // Files
  newFile: (req, res, next) => {
    // add form data to Events table
    // if upload file add to Media table
    // if textDetect transcript add to Transcripts table

    const dbInstance = req.app.get("db");

    dbInstance
      .new_file([date, folder_id, notes])
      .then(() => res.status(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Error adding file" });
        console.log(error);
      });
  },
  getFileOne: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { user_id, id } = req.params;

    dbInstance
      .get_file(user_id, id)
      .then(file => {
        res.status(200).send(file);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error getting files" });
        console.log(err);
      });
  },

  getFiles: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // const { params } = req;

    dbInstance
      .get_files()
      .then(files => {
        res.status(200).send(files);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error getting files" });
        console.log(err);
      });
  },

  updateFile: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .update_file(params.id)
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
    const { params } = req;

    dbInstance
      .delete_file(params.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error deleting file" });
        console.log(err);
      });
  }
};
