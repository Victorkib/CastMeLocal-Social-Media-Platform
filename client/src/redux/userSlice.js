import { createSlice } from '@reduxjs/toolkit';
import { user as defaultUser } from '../assets/data';

const initialState = {
  user: JSON.parse(window?.localStorage.getItem('chat-user')) ?? defaultUser,
  edit: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('chat-user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem('chat-user');
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
  },
});

export default userSlice.reducer;

export function UserLogin(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login(user));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}

export function UpdateProfile(val) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updateProfile(val));
  };
}
