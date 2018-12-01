const initialState = {
  filesToUpload: [
    {
      id: {
        file: null,
        type: "",
        size: "",
        date: "",
        folder: null,
        notes: "",
        transcriptText: ""
      }
    }
  ]
};

// user's selected files
const HANDLE_FILES_TO_UPLOAD = "HANDLE_FILES_TO_UPLOAD";

//

// handles date input
const HANDLE_DATE_INPUT = "HANDLE_DATE_INPUT";

// handles notes input
const HANDLE_NOTES_INPUT = "HANDLE_NOTES_INPUT";

// handles tesseract text results
const HANDLE_EXTRACTED_TEXT = "HANDLE_EXTRACTED_TEXT";

// get file id
const GET_FILE_ID = "GET_FILE_ID";

//

function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_FILES_TO_UPLOAD:
      return { ...state, filesToUpload: action.payload };
    case HANDLE_DATE_INPUT:
      return { ...state, date: action.payload };
    case HANDLE_NOTES_INPUT:
      return { ...state, notes: action.payload };
    case HANDLE_EXTRACTED_TEXT:
      return { ...state, transcriptText: action.payload };
    default:
      return state;
  }
}

// EXPORT FUNCTIONS HERE

export function handleFilesToUpload(files) {
  return {
    type: HANDLE_FILES_TO_UPLOAD,
    payload: files
  };
}

export function handleDateInput(date) {
  return {
    type: HANDLE_DATE_INPUT,
    payload: date
  };
}
export function handleNotesInput(notes) {
  return {
    type: HANDLE_NOTES_INPUT,
    payload: notes
  };
}
export function handleExtractedText(text) {
  return {
    type: HANDLE_EXTRACTED_TEXT,
    payload: text
  };
}
export default reducer;
