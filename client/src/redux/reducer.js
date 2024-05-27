import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import themeSlice from './theme';
import postSlice from './postSlice';
import vicUserSlice from '../features/users/vicUserSlice';

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  posts: postSlice,
  usersData: vicUserSlice,
});

export { rootReducer };
