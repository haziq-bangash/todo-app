// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: null,
  token: null,
  picture: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.picture = null;
      state.userId = null;
    },
  },
});

export const { setUser, setUserId, setToken, setPicture, clearUser } = userSlice.actions;
export default userSlice.reducer;
