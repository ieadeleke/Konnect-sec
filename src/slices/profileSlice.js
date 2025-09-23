import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _get_profile } from "../common/axios_services";

const initialState = {
  fetch: false,
  dataFetched: null, 
  token: false,
  loading: false,
  error: null,
};


export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {

      const { auth, userProfile } = getState();




      if (!auth.isAuthenticated) {
        return rejectWithValue("User not authenticated");
      }

      const response = await _get_profile();
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const profileSlice = createSlice({
  name: "profileInfo",
  initialState,
  reducers: {






    encrypted_token: (state, action) => {
      state.token = action.payload;
    },
    resetProfile: (state) => {

      state.userData = null;
      state.isAuthenticated = false;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch = true;
        state.dataFetched = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.fetch = false;
        state.dataFetched = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { fetchData, profileData, encrypted_token, resetProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
