module.exports = {
  // Folders
  createFolder: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { name } = req.body;
    dbInstance
      .create_folder(name, req.user.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error creating folder" });
        console.log(err);
      });
  },
  readFolder: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { folder } = req.params;

    dbInstance
      .get_files_in_folder(folder.id, req.user.id)
      .then(folder => {
        res.status(200).send(folder);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error getting folder" });
        console.log(err);
      });
  },
  getFolders: (req, res, next) => {
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
    const dbInstance = req.app.get("db");
    const { folder } = req.params;

    dbInstance
      .delete_folder(folder.id, req.user.id)
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
  },

  newPost: (req, res, next) => {
    console.log("new post");
    //   const dbInstance = req.app.get("db");
    //   const { postData, uploadFiles, transcript, folder } = req.body;
    //   const postData = [
    //     postData.title,
    //     postData.date,
    //     postData.notes,
    //     folder.id,
    //     req.user.id
    //   ]
    //   const uploadData = [
    //     uploadFile.name,
    //     uploadFile.type,
    //     uploadFile.s3Url,
    //     req.user.id
    //   ]
    //   const transcriptData = [
    //     transcript.title,
    //     transcript.transcript,
    //     req.user.id
    //   ]
    //   dbInstance
    //     .save_postData(postData).then(post => {
    //       const post_id = post.id
    //       dbInstance
    //         .save_uploadFiles(uploadData, post_id).then( upload => {
    //           const upload_file = upload.id
    //         })
    //     .catch(error => {
    //       res.status(500).send({ errorMessage: "Error adding file" });
    //       console.log(error);
    //     });
  },
  readPost: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { user_id, id } = req.params;
    dbInstance
      .get_file(id, req.user.id)
      .then(file => {
        res.status(200).send(file);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error getting files" });
        console.log(err);
      });
  },

  readPosts: (req, res, next) => {
    const dbInstance = req.app.get("db");

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

  updatePost: (req, res, next) => {
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

  deletePost: (req, res, next) => {
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
