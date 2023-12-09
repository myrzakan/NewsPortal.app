import { configureStore } from '@reduxjs/toolkit';
import googleReducer from './slices/useGoogleSlice';
import themeReducer from './slices/useThemeSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    google: googleReducer,
    theme: themeReducer,
  },
});
