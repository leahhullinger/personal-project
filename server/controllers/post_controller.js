module.exports = {
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
    const { id } = req.params;
    dbInstance
      .read_post(id, req.user.id)
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
      .read_posts(req.user.id)
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
    const { id } = req.params;
    const { title, date, notes } = req.body;

    dbInstance
      .update_post(title, date, notes, id, req.user.id)
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
    const { id } = req;

    dbInstance
      .delete_post(id, req.user.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "error deleting file" });
        console.log(err);
      });
  }
};
