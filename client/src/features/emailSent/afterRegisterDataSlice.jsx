import { createSlice } from '@reduxjs/toolkit';

const afterRegisterDataSlice = createSlice({
  name: 'afterRegisterData',
  initialState: {
    afterRegisterData: null, // Initialize with null or an empty object if that's what you expect
  },
  reducers: {
    setAfterRegisteredData: (state, action) => {
      state.afterRegisterData = action.payload;
    },
    resetAfterRegisteredData: (state) => {
      state.afterRegisterData = null; // Reset to initial state
    },
  },
});

export const { setAfterRegisteredData, resetAfterRegisteredData } =
  afterRegisterDataSlice.actions;
export default afterRegisterDataSlice.reducer;
