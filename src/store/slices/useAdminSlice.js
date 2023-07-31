import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // isAdmin: false,
  adminCredentials: {
    name: 'admin', 
    email: 'admin@admin.com',
    password: 'adminadmin',
    isAuthenticated: false,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.adminCredentials.name = action.payload.name;
      state.adminCredentials.email = action.payload.email;
      state.adminCredentials.password = action.payload.password;
      state.isAuthenticated = true;
    },
    removeAdmin(state) {
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;
export default adminSlice.reducer;