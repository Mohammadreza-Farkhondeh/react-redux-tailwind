import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from './authService';
import type {
  SignupRequest,
  SignupResponse,
  TokenObtainRequest,
  TokenRefreshRequest,
  TokenResponse,
  UserOut
} from './authTypes';
import { RootState } from '../../store';

export const login = createAsyncThunk<
  TokenResponse,
  TokenObtainRequest,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await AuthService.login(credentials);
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const signup = createAsyncThunk<
  SignupResponse,
  SignupRequest,
  { rejectValue: string }
>('auth/signup', async (credentials, { rejectWithValue }) => {
  try {
    const data = await AuthService.signup(credentials);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const refresh = createAsyncThunk<
  TokenResponse,
  TokenRefreshRequest,
  { rejectValue: string; state: { auth: RootState['auth'] } }
>('auth/refresh', async (_, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState();
    const refreshToken = auth.refresh;
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const data = await AuthService.refresh({ refresh: refreshToken });
    localStorage.setItem('accessToken', data.access);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getCurrentUser = createAsyncThunk<
  UserOut,
  void,
  { rejectValue: string }
>('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const data = await AuthService.getCurrentUser();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unexpected error occurred');
  }
});
