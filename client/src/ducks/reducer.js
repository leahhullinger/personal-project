import axios from "axios";
const BASE_URL = "http://localhost:3005";
const initialState = {
  filesToUpload: [],
  date: "",
  folder: null,
  notes: "",
  detectedText: "",
  folder: "",
  s3Urls: []
};

// user's selected files
const UPDATE_SELECTED_FILES = "UPDATE_SELECTED_FILES";
// s3 ref urls
const UPDATE_S3_URLS = "UPDATE_S3_URLS";
// handles date input
const UPDATE_DATE = "UPDATE_DATE";

// UPDATEs notes input
const UPDATE_NOTES = "UPDATE_NOTES";

// UPDATEs tesseract text results
const UPDATE_TEXT_DETECT = "UPDATE_TEXT_DETECT";

// folder select
const UPDATE_FOLDER = "UPDATE_FOLDER";
// submit form
const ON_FORM_SUBMIT = "ON_FORM_SUBMIT";

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_FILES:
      console.log(action.payload);
      return {
        ...state,
        filesToUpload: [action.payload]
      };
    case UPDATE_S3_URLS:
      return {
        ...state,
        s3Urls: action.payload
      };
    case UPDATE_DATE:
      return { ...state, date: action.payload };
    case UPDATE_NOTES:
      return { ...state, notes: action.payload };
    case UPDATE_TEXT_DETECT:
      return { ...state, transcriptText: action.payload };
    case UPDATE_FOLDER:
      return { ...state, folder: action.payload };
    case ON_FORM_SUBMIT:
      return { ...state, date: action.payload, notes: action.payload };
    default:
      return state;
  }
}

// EXPORT FUNCTIONS HERE

export function updateSelectedFiles(files) {
  console.log(files);
  return {
    type: UPDATE_SELECTED_FILES,
    payload: files
  };
}
export function updateDate(date) {
  return {
    type: UPDATE_DATE,
    payload: date
  };
}
export function updateNotes(notes) {
  return {
    type: UPDATE_NOTES,
    payload: notes
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
export function onFormSubmit(date, notes) {
  return {
    type: ON_FORM_SUBMIT,
    payload: axios
      .post(BASE_URL + "/api/upload", {
        date,
        notes
      })
      .then(response => {
        console.log(response.data);
      })
  };
}

export default reducer;
