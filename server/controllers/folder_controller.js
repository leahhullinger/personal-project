module.exports = {
  createFolder: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { name } = req.body;
    dbInstance
      .create_folder(name, req.user.id)
      .then(folders => {
        res.status(200).send({ folder: folders[0] });
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error creating folder" });
        console.log(err);
      });
  },
  readFolder: (req, res, next) => {
    console.log("req.params", req.params);
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    dbInstance
      .read_folder(id, 5)
      .then(folder => {
        console.log(folder);
        res.status(200).send(folder);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ errorMessage: "error getting folder" });
      });
  },
  readFolders: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_folders(req.user.id)
      .then(folders => {
        res.status(200).send(folders);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error getting folders" });
        console.log(err);
      });
  },
  // figure out sql statement for deleted files within the folder and folder
  deleteFolder: (req, res, next) => {
    console.log(req.params);
    const dbInstance = req.app.get("db");
    const { id } = req.params;

    console.log(req.user.id);
    dbInstance
      .delete_folder(id, req.user.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error deleting folder" });
        console.log(err);
      });
  },
  updateFolderName: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { id } = req.params;
    const { folderName } = req.body;

    dbInstance
      .update_folder_name(folderName, id, req.user.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error update folder" });
        console.log(err);
      });
  }
};
