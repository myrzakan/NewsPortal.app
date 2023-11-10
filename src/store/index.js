import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import googleReducer from './slices/useGoogleSlice';
import themeReducer from './slices/useThemeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    google: googleReducer,
    theme: themeReducer,
  },
});
