import {
  ADD_FOLDER_COMPLETE,
  GET_FOLDERS_COMPLETE,
  GET_FOLDER_COMPLETE,
  DELETE_FOLDER_COMPLETE,
  UPDATE_FOLDER_COMPLETE
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
  s3Urls: [],
  folders: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER_COMPLETE:
      return {
        ...state,
        folders: [...state.folders, action.payload]
      };
    case GET_FOLDERS_COMPLETE:
      return { ...state, folders: action.payload };
    case GET_FOLDER_COMPLETE:
      return {
        ...state,
        folders: this.state.map(folder => {
          if (folder.id === action.payload.id) {
            return action.payload;
          }
          return folder;
        })
      };
    case DELETE_FOLDER_COMPLETE:
      return {
        ...state,
        folders: this.state.filter(folder => folder.id === action.payload)
      };
    case UPDATE_FOLDER_COMPLETE:
      return {
        ...state,
        folders: this.state.map(folder => {
          if (folder.id === action.payload.id) {
            return { ...action.payload };
          }
          return folder;
        })
      };
    default:
      return state;
  }
}

export default reducer;
