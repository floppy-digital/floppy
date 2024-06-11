import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import appReducer from './Redux';

const logger = [createLogger({ collapsed: true })];

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

// export default createStore(
//   appReducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
