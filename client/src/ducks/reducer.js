import {
  ADD_FOLDER_COMPLETE,
  ADD_FILE_COMPLETE,
  GET_FOLDERS_COMPLETE,
  GET_FOLDER_COMPLETE,
  GET_FILES_COMPLETE,
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
  folders: [],
  files: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLDER_COMPLETE:
      console.log(action.payload);
      return {
        ...state,
        folders: [...state.folders, action.payload]
      };
    case ADD_FILE_COMPLETE:
      return {
        ...state,
        files: [...state.files, action.payload]
      };
    case GET_FOLDERS_COMPLETE:
      return { ...state, folders: action.payload };
    case GET_FILES_COMPLETE:
      return { ...state, files: action.payload };
    case GET_FOLDER_COMPLETE:
      return {
        ...state,
        folders: state.folders.map(folder => {
          if (folder.id === action.payload.id) {
            return action.payload;
          }
          return folder;
        })
      };
    case DELETE_FOLDER_COMPLETE:
      return {
        ...state,
        folders: state.folders.filter(folder => folder.id !== action.payload)
      };
    case UPDATE_FOLDER_COMPLETE:
      return {
        ...state,
        folders: state.folders.map(folder => {
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
