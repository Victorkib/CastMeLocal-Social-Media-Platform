import { configureStore } from '@reduxjs/toolkit';
import vicUserSlice from '../features/users/vicUserSlice';
import afterRegisterDataSlice from '../features/emailSent/afterRegisterDataSlice';

export const store = configureStore({
  reducer: {
    usersData: vicUserSlice,
    afterRegDt: afterRegisterDataSlice,
  },
});
