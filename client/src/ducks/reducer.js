import {
  UPDATE_DATE,
  UPDATE_FOLDER,
  UPDATE_NOTES,
  UPDATE_S3_URLS,
  UPDATE_SELECTED_FILES,
  UPDATE_TEXT_DETECT,
  ON_FORM_SUBMIT
} from "./constants";
/** 
type FileT = {
  id: string,
  name: string,
  image: ?string,
  notes: string,
  detectedText: string,
  date: string,
}

type UserT = {
  id: string,
  name: string,
  folders: FileT[],
}
*/

const initialState = {
  filesToUpload: [],
  date: "",
  title: "",
  folder: null,
  notes: "",
  detectedText: "",
  folder: "",
  s3Urls: []
};

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
    // case UPDATE_TITLE:
    //   return { ...state, title: action.payload };
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

export default reducer;
