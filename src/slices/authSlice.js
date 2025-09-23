import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, logout_user } from '../common/axios_services';
import Jwt_encrypt from '../common/Jwt_encrypt';
import { resetProfile } from './profileSlice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials);

      const token = Jwt_encrypt({ token: response?.data?.data?.token });
      localStorage.setItem('konnect_token', token);
      return { token, user: response?.data?.data || null };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {

      dispatch(resetProfile());
      

      await logout_user();
      

      localStorage.removeItem('konnect_token');
      
      return null;
    } catch (error) {
      console.log(" logut err :: ", error)

      localStorage.removeItem('konnect_token');
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);


const token = localStorage.getItem('konnect_token');

const initialState = {
  isAuthenticated: !!token,
  user: null,
  token: token || null,
  loading: false,
  error: null,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('konnect_token');
    },
    
    setLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;

        state.isAuthenticated = false;

        state.isLoggingOut = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;

        state.isLoggingOut = false;
      })
      .addCase(logoutUser.rejected, (state) => {

        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;

        state.isLoggingOut = false;
      });
  },
});

export const { setUser, clearAuth, setLoggingOut } = authSlice.actions;
export default authSlice.reducer;