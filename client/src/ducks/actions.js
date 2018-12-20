import axios from "axios";

import {
  UPDATE_FOLDER,
  UPDATE_S3_URLS,
  UPDATE_SELECTED_FILES,
  UPDATE_TEXT_DETECT,
  ON_FORM_SUBMIT,
  API_URL
} from "./constants";

/** Action creators */
export function updateSelectedFiles(files) {
  console.log(files);
  return {
    type: UPDATE_SELECTED_FILES,
    payload: files
  };
}

export function updateS3Urls(s3Urls) {
  return {
    type: UPDATE_S3_URLS,
    payload: s3Urls
  };
}
export function updateTextDetect(text) {
  return {
    type: UPDATE_TEXT_DETECT,
    payload: text
  };
}
export function updateFolder(folder) {
  return {
    type: UPDATE_FOLDER,
    payload: folder
  };
}

/** async API calls */

export function onFormSubmit(file) {
  return {
    type: ON_FORM_SUBMIT,
    payload: axios
      .post(API_URL + "/add/file", file)
      //.post(BASE_URL + "/api/upload", { file })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log(err))
  };
}
