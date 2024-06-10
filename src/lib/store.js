import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './Redux';

const middleware = [createLogger({ collapsed: true })];

export default createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
