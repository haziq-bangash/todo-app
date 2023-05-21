// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// we have four states that will be used all over the website
const initialState = {
  user: null, // store user email
  userId: null, // store user's unique id that is in the database
  token: null, // jwt token
  picture: null, // user's profile picture
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
    // clear all states when user logs out
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
