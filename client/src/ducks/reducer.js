const initialState = {
  filesToUpload: []
};

// Action Names
const UPDATE_FILES_TO_UPLOAD = "UPDATE_FILES_TO_UPLOAD";

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILES_TO_UPLOAD:
      return { ...state, filesToUpload: action.payload };
    default:
      return state;
  }
}

// EXPORT FUNCTIONS HERE

export function UpdateFilesToUpload(files) {
  return {
    type: UPDATE_FILES_TO_UPLOAD,
    payload: files
  };
}
export default reducer;
