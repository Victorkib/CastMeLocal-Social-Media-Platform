import { createSlice } from '@reduxjs/toolkit';
const vicUserSlice = createSlice({
  name: 'MyUsers',
  initialState: {
    MyUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.MyUsers = action.payload;
    },
    removeMyUsers: (state, action) => {
      state.MyUsers = state.MyUsers.filter(
        (user) => user._id !== action.payload._id
      );
    },
  },
});

export const { setMyUsers, removeMyUsers } = vicUserSlice.actions;
export default vicUserSlice.reducer;
