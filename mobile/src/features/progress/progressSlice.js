import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const initialState = {
  progress: null,
  stats: null,
  bookmarks: [],
  notes: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get reading progress
export const getProgress = createAsyncThunk(
  'progress/getProgress',
  async ({ userId, bookId }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/progress/${userId}/${bookId}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update reading progress
export const updateProgress = createAsyncThunk(
  'progress/updateProgress',
  async (progressData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/progress`, progressData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user reading stats
export const getStats = createAsyncThunk(
  'progress/getStats',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/progress/stats/${userId}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.progress = action.payload.progress;
      })
      .addCase(getProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.progress = action.payload.progress;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload.stats;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = progressSlice.actions;
export default progressSlice.reducer;