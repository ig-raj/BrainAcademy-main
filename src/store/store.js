import { configureStore } from '@reduxjs/toolkit';
import authSlice from './AuthSlice';
import { thunk } from 'redux-thunk';




const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
