import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: null,
  email: null,
  token: null,
  id: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
      state.isAuthenticated = true
    },
    removeUser(state) {
      state.name = null
      state.email = null
      state.token = null
      state.id = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
