// this code came from fineUploader / server-examples node.js

require("dotenv").config();
const path = require("path");
// fs for working with computer file system
const fs = require("fs");
// rimraf - for 'rm-rf' support
const rimraf = require("rimraf");
// mkdirp for mkdir -p support
const mkdirp = require("mkdirp");
// multiparty for parsing request payloads
const multiparty = require("multiparty");

// ask about this...define these in .env?
const fileInputName = process.env.FILE_INPUT_NAME || "qqfile";
const uploadedFilesPath = "uploads/";
const chunkDirName = "chunks";
const maxFileSize = process.env.MAX_FILE_SIZE || 0; // in bytes, 0 for unlimited

const onUpload = (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    console.log("fields", fields);
    const partIndex = fields.qqpartindex;

    // text/plain is required to ensure support for IE9 and older
    res.set("Content-Type", "text/plain");

    if (partIndex == null) {
      onSimpleUpload(fields, files[fileInputName][0], res);
    } else {
      onChunkedUpload(fields, files[fileInputName][0], res);
    }
  });
};

const onSimpleUpload = (fields, file, res) => {
  const uuid = fields.qquuid,
    responseData = {
      success: false
    };

  file.name = fields.qqfilename;

  if (isValid(file.size)) {
    moveUploadedFile(
      file,
      uuid,
      () => {
        responseData.success = true;
        res.send(responseData);
      },
      () => {
        responseData.error = "Problem copying the file!";
        res.send(responseData);
      }
    );
  } else {
    failWithTooBigFile(responseData, res);
  }
};

const onDeleteFile = (req, res) => {
  var uuid = req.params.uuid,
    dirToDelete = uploadedFilesPath + uuid;

  rimraf(dirToDelete, function(error) {
    if (error) {
      console.error("Problem deleting file! " + error);
      res.status(500);
    }

    res.send();
  });
};

const isValid = size => {
  return maxFileSize === 0 || size < maxFileSize;
};

const moveFile = (
  destinationDir,
  sourceFile,
  destinationFile,
  success,
  failure
) => {
  mkdirp(destinationDir, function(error) {
    var sourceStream, destStream;

    if (error) {
      console.error(
        "Problem creating directory " + destinationDir + ": " + error
      );
      failure();
    } else {
      sourceStream = fs.createReadStream(sourceFile);
      destStream = fs.createWriteStream(destinationFile);

      sourceStream
        .on("error", function(error) {
          console.error("Problem copying file: " + error.stack);
          destStream.end();
          failure();
        })
        .on("end", function() {
          destStream.end();
          success();
        })
        .pipe(destStream);
    }
  });
};

const moveUploadedFile = (file, uuid, success, failure) => {
  console.log("move file", uploadedFilesPath, uuid);
  const destinationDir = path.join(uploadedFilesPath, uuid[0]),
    fileDestination = path.join(destinationDir + file.name);

  moveFile(destinationDir, file.path, fileDestination, success, failure);
};

const storeChunk = (file, uuid, index, numChunks, success, failure) => {
  const destinationDir = path.join(
      uploadedFilesPath + uuid + "/" + chunkDirName + "/"
    ),
    chunkFilename = getChunkFilename(index, numChunks),
    fileDestination = path.join(destinationDir + chunkFilename);

  moveFile(destinationDir, file.path, fileDestination, success, failure);
};

const combineChunks = (file, uuid, success, failure) => {
  const chunksDir = path.join(
      uploadedFilesPath + uuid + "/" + chunkDirName + "/"
    ),
    destinationDir = path.join(uploadedFilesPath + uuid + "/"),
    fileDestination = path.join(destinationDir + file.name);

  fs.readdir(chunksDir, function(err, fileNames) {
    destFileStream;

    if (err) {
      console.error("Problem listing chunks! " + err);
      failure();
    } else {
      fileNames.sort();
      destFileStream = fs.createWriteStream(fileDestination, { flags: "a" });

      appendToStream(
        destFileStream,
        chunksDir,
        fileNames,
        0,
        () => {
          rimraf(chunksDir, function(rimrafError) {
            if (rimrafError) {
              console.log("Problem deleting chunks dir! " + rimrafError);
            }
          });
          success();
        },
        failure
      );
    }
  });
};

const appendToStream = (
  destStream,
  srcDir,
  srcFilesnames,
  index,
  success,
  failure
) => {
  if (index < srcFilesnames.length) {
    fs.createReadStream(srcDir + srcFilesnames[index])
      .on("end", () => {
        appendToStream(
          destStream,
          srcDir,
          srcFilesnames,
          index + 1,
          success,
          failure
        );
      })
      .on("error", error => {
        console.error("Problem appending chunk! " + error);
        destStream.end();
        failure();
      })
      .pipe(
        destStream,
        { end: false }
      );
  } else {
    destStream.end();
    success();
  }
};

const getChunkFilename = (index, count) => {
  const digits = new String(count).length,
    zeros = new Array(digits + 1).join("0");

  return (zeros + index).slice(-digits);
};

// FUNCTIONS REFERENCED IN MODULES

const onChunkedUpload = (fields, file, res) => {
  const size = parseInt(fields.qqtotalfilesize),
    uuid = fields.qquuid,
    index = fields.qqpartindex,
    totalParts = parseInt(fields.qqtotalparts),
    responseData = {
      success: false
    };

  file.name = fields.qqfilename;

  if (isValid(size)) {
    storeChunk(
      file,
      uuid,
      index,
      totalParts,
      () => {
        if (index < totalParts - 1) {
          responseData.success = true;
          res.send(responseData);
        } else {
          combineChunks(
            file,
            uuid,
            () => {
              responseData.success = true;
              res.send(responseData);
            },
            () => {
              responseData.error = "Problem conbining the chunks!";
              res.send(responseData);
            }
          );
        }
      },
      reset => {
        responseData.error = "Problem storing the chunk!";
        res.send(responseData);
      }
    );
  } else {
    failWithTooBigFile(responseData, res);
  }
};

const failWithTooBigFile = (responseData, res) => {
  responseData.error = "Too big!";
  responseData.preventRetry = true;
  res.send(responseData);
};

app.listen(port);
