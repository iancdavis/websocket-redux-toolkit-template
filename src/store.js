import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers';
import socketMiddleware from './socketMiddleware';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware)
});

export default store;