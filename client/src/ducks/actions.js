import axios from "axios";

import {
  ADD_FOLDER_COMPLETE,
  GET_FOLDERS_COMPLETE,
  GET_FOLDER_COMPLETE,
  DELETE_FOLDER_COMPLETE,
  UPDATE_FOLDER_COMPLETE
} from "./constants";

/** Action creators */

export function updateSelectedFiles(files) {
  console.log(files);
  return {
    type: "UPDATE_SELECTED_FILES",
    payload: files
  };
}

export function addFolderComplete(folder) {
  return {
    type: ADD_FOLDER_COMPLETE,
    payload: folder
  };
}

export function getFoldersComplete(folders) {
  return {
    type: GET_FOLDERS_COMPLETE,
    payload: folders
  };
}

export function getFolderComplete(file) {
  return {
    type: GET_FOLDER_COMPLETE,
    payload: file
  };
}

export function deleteFolderComplete(id) {
  return {
    type: DELETE_FOLDER_COMPLETE,
    payload: id
  };
}

export function updateFolderComplete(id, update) {
  return {
    type: UPDATE_FOLDER_COMPLETE,
    payload: { id, ...update }
  };
}

/** async API calls */

// export function onFormSubmit(file) {
//   return {
//     type: ON_FORM_SUBMIT,
//     payload: axios
//       .post(API_URL + "/add/file", file)
//       //.post(BASE_URL + "/api/upload", { file })
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(err => console.log(err))
//   };
// }

/** API calls */
export function getAllFolders() {
  return axios.get("/api/folders");
}

export function folderAction(actionType, id) {
  const apiCall = `/api/folder/${id}`;
  switch (actionType) {
    case "get":
      return axios.get(apiCall);
    case "delete":
      return axios.delete(apiCall);
    case "update":
      return axios.put(apiCall);
    default:
      break;
  }
}

export function addFolder(name) {
  return axios.post("/api/add/folder", { name });
}
