import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  groups: [],
  group: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get user groups
export const getUserGroups = createAsyncThunk(
  'groups/getUserGroups',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/groups/user/${userId}`);
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

// Get group by ID
export const getGroup = createAsyncThunk(
  'groups/getById',
  async (groupId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/groups/${groupId}`);
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

// Create group
export const createGroup = createAsyncThunk(
  'groups/create',
  async (groupData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/groups`, groupData);
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

// Join group
export const joinGroup = createAsyncThunk(
  'groups/join',
  async ({ groupId, userId }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/groups/${groupId}/join`, { userId });
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

export const groupSlice = createSlice({
  name: 'groups',
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
      .addCase(getUserGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups = action.payload.groups;
      })
      .addCase(getUserGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.group = action.payload.group;
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups.push(action.payload.group);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(joinGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the group in the list if it exists
        const index = state.groups.findIndex(g => g._id === action.payload.group._id);
        if (index !== -1) {
          state.groups[index] = action.payload.group;
        }
        // Also update the single group if it's the same
        if (state.group && state.group._id === action.payload.group._id) {
          state.group = action.payload.group;
        }
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = groupSlice.actions;
export default groupSlice.reducer;