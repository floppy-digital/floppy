import { combineReducers } from "redux";
import editorReducer from "./editor";
import metadataReducer from "./metadata";
import userReducer from "./user";

const appReducer = combineReducers({
  editor: editorReducer,
  metadata: metadataReducer,
  user: userReducer,
});

export default appReducer;
