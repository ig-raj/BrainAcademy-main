// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    selectedClass: null, // add selectedClass field
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      Cookies.set('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.selectedClass = null; // clear class on logout
      Cookies.remove('user');
    },
    setSelectedClass(state, action) {
      state.selectedClass = action.payload;
    },
    setUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
});

export const { login, logout, setSelectedClass,  setUserFromStorage  } = authSlice.actions;
export default authSlice.reducer;
