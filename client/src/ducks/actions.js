import axios from "axios";

import {
  UPDATE_FOLDER,
  UPDATE_S3_URLS,
  UPDATE_SELECTED_FILES,
  UPDATE_TEXT_DETECT,
  ON_FORM_SUBMIT,
  API_URL,
  ON_READ_FOLDER_SUCCESS,
  ON_GET_FOLDERS_SUCCESS
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

export function onReadFolderSuccess(files) {
  return {
    type: ON_READ_FOLDER_SUCCESS,
    payload: files
  };
}

export function onGetFoldersSuccess(folders) {
  return {
    type: ON_GET_FOLDERS_SUCCESS,
    payload: folders
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
// files in a folder
export function onReadFolder(folder_id) {
  return dispatch => {
    return axios
      .get(API_URL + `/folder/${folder_id}`)
      .then(response => {
        dispatch(onReadFolderSuccess(response.data));
      })
      .catch(error => console.log(error));
  };
}
// user's folders
export function onGetFolders() {
  return dispatch => {
    return axios
      .get(API_URL + "folders")
      .then(response => {
        dispatch(onGetFoldersSuccess(response.data));
      })
      .catch(error => console.log(error));
  };
}
