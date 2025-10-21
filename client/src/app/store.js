import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookReducer from '../features/books/bookSlice';
import groupReducer from '../features/groups/groupSlice';
import progressReducer from '../features/progress/progressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    groups: groupReducer,
    progress: progressReducer,
  },
});