import { combineReducers } from 'redux';
import globalReducer from './global';
import templateReducer from './template';
import centerLabelReducer from './centerLabel';
import stampsReducer from './stamps';
import stickersReducer from './stickers';

const editorReducer = combineReducers({
  global: globalReducer,
  template: templateReducer,
  cl: centerLabelReducer,
  stamps: stampsReducer,
  stickers: stickersReducer,
});

export default editorReducer;
