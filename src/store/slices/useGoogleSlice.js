// googleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayName: '',
  email: '',
  isAuthenticated: false,
  token: null
};

const googleSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    setGoogleUserData: (state, action) => {
      state.displayName = action.payload.displayName || '';
      state.email = action.payload.email || '';
      state.isAuthenticated = true;
      state.token = action.payload.token
    },
    clearGoogleUserData: (state) => {
      state.displayName = null;
      state.email = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setGoogleUserData, clearGoogleUserData } = googleSlice.actions;

export default googleSlice.reducer;
