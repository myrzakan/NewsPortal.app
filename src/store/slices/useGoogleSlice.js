// googleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayName: '',
  email: '',
};

const googleSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    setGoogleUserData: (state, action) => {
      state.displayName = action.payload.displayName || '';
      state.email = action.payload.email || '';
    },
    clearGoogleUserData: (state) => {
      state.displayName = '';
      state.email = '';
    },
  },
});

export const { setGoogleUserData, clearGoogleUserData } = googleSlice.actions;

export default googleSlice.reducer;
