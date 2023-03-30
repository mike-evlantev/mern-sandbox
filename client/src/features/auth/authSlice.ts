import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { narrowError } from '../../utils/errorUtils';
import { authService } from './authService';

const user = JSON.parse(localStorage.getItem('user') as string);

interface AuthState {
  loading: boolean,
  success: boolean,
  error: unknown,
  user: User | null
}

const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  user
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, first, last }: { email: string, password: string, first: string, last: string }, thunkAPI) => {
    try {
      return await authService.register({ email, password, first, last });
    } catch (error) {
      const message = narrowError(error);
      //thunkAPI.dispatch(alert({text: message, type: "danger"}));
      return thunkAPI.rejectWithValue(message);
    }
  });

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string }, thunkAPI) => { 
    try {
      return await authService.login({ email, password });
    } catch (error) {
      const message = narrowError(error);
      return thunkAPI.rejectWithValue(message);
    }
  });

// Logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
      return await authService.logout();
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true })
      .addCase(register.fulfilled, (state, action: PayloadAction<User | null>) => {
        return { ...state, loading: false, success: true, error: null, user: action.payload };
      })
      .addCase(register.rejected, (state, action) => {
        return { ...state, loading: false, success: false, error: narrowError(action.payload), user: null };
      })
      .addCase(login.pending, (state) => { state.loading = true })
      .addCase(login.fulfilled, (state, action: PayloadAction<User | null>) => {
        return { ...state, loading: false, success: true, error: null, user: action.payload };
      })
      .addCase(login.rejected, (state, action) => {
        return { ...state, loading: false, success: false, error: narrowError(action.payload), user: null };
      })
      .addCase(logout.fulfilled, (state) => {
        return { ...state, user: null };
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;