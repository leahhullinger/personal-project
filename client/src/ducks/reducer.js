import axios from "axios";
const BASE_URL = "http://localhost:3005";
const initialState = {
  filesToUpload: [
    {
      name: "",
      size: 0,
      type: ""
    }
  ],
  date: "",
  folder: null,
  notes: "",
  extractedText: "",
  folder: ""
};

// user's selected files
const ON_FILE_SELECT = "ON_FILE_SELECT";
// handles date input
const UPDATE_DATE = "UPDATE_DATE";

// UPDATEs notes input
const UPDATE_NOTES = "UPDATE_NOTES";

// UPDATEs tesseract text results
const UPDATE_EXTRACTED_TEXT = "UPDATE_EXTRACTED_TEXT";

// folder select
const UPDATE_FOLDER = "UPDATE_FOLDER";
// submit form
const ON_FORM_SUBMIT = "ON_FORM_SUBMIT";

function reducer(state = initialState, action) {
  switch (action.type) {
    case ON_FILE_SELECT:
      return {
        ...state,
        filesToUpload: {
          name: action.payload,
          size: action.payload,
          type: action.payload
        }
      };
    case UPDATE_DATE:
      return { ...state, date: action.payload };
    case UPDATE_NOTES:
      return { ...state, notes: action.payload };
    case UPDATE_EXTRACTED_TEXT:
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

export function onFileSelect({ files }) {
  const {
    file: { name, size, type }
  } = files;
  console.log(files);
  return {
    type: ON_FILE_SELECT,
    payload: {
      name: name,
      size: size,
      type: type
    }
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
export function updateExtractedText(text) {
  return {
    type: UPDATE_EXTRACTED_TEXT,
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
