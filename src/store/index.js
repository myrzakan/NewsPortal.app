import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './slices/userSlice'
import googleReducer from './slices/useGoogleSlice'
import adminReducer from './slices/useAdminSlice'

export const store =configureStore({
  reducer: {
    user: userReducer,
    google: googleReducer,
    admin: adminReducer,
  },
})
