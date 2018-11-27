import { createStore, applyMiddleware } from "redux";
import reducer from "./ducks/reducer";
import promiseMiddleware from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
);
export default store;
