const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.post('/api/upload', (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/api/upload/user/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

let imageFile = req.files.imageFile

imageFile.mv('api/upload/image', (eror)

module.exports = {
  uploadImage: (req, res, next) => {
    const dbInstance = req.app.get('db')
    const images = req.files.images

    if(Object.keys(req.files).length == 0 ) {
      return res.status(400).send('No files were uploaded')
    } else {
      images.mv('/api/upload/user/filename', (error) => {
        if(error)
        res.sendStatus(500).send(error)
      })
    }

    
  },
}