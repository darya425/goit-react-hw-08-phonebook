import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    removeCredetials: state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    setCurrentUser: (state, { payload }) => {
      state.user = { ...payload };
      state.isLoggedIn = true;
    },
  },
  extraReducers: builder => {},
});

export default slice.reducer;

export const { setCredentials, removeCredetials, setCurrentUser } =
  slice.actions;

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;
export const getUserToken = state => state.auth.token;
