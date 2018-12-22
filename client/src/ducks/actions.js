import axios from "axios";

import {
  ADD_FOLDER_COMPLETE,
  GET_FOLDERS_COMPLETE,
  GET_FOLDER_COMPLETE,
  DELETE_FOLDER_COMPLETE,
  UPDATE_FOLDER_COMPLETE,
  ADD_FILE_COMPLETE,
  GET_FILES_COMPLETE,
  API_URL
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

export function addFileComplete(file) {
  return {
    type: ADD_FILE_COMPLETE,
    payload: file
  };
}

export function getFilesComplete(files) {
  return {
    type: GET_FILES_COMPLETE,
    payload: files
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
export function axiosGetAllFolders() {
  return axios.get("/api/folders");
}

export function axiosGetFolder(id) {
  return axios.get(`/api/folder/${id}`);
}

export function axiosDeleteFolder(id) {
  return axios.delete(`/api/folder/${id}`);
}

export function axiosUpdateFolder(id) {
  return axios.update(`/api/folder/${id}`);
}

export function axiosAddFolder(name) {
  return axios.post("/api/add/folder", { name });
}

export function axiosGetAllFiles() {
  return axios.get("/api/files");
}

export function axiosAddFile(upload) {
  console.log(upload);
  return axios.post(`${API_URL}/add/file`, { ...upload });
}
