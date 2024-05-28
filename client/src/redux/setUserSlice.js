import { createSlice } from '@reduxjs/toolkit';

const userSliceTest = createSlice({
  name: 'user',
  initialState: {
    user: null, // Corrected property name for consistency
  },
  reducers: {
    setUserTest(state, action) {
      // Update state immutably using Immer (recommended)
      state.user = action.payload;
    },
    // Additional reducers as needed, following the same pattern
  },
});

export const { setUserTest } = userSliceTest.actions; // Selectively export actions
export default userSliceTest.reducer; // Export the reducer for store creation
