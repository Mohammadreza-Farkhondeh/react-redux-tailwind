import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from './authService';
import type {
  RegisterRequest,
  UserProfile,
  TokenObtainPairRequest,
  TokenObtainPairResponse,
  TokenRefreshResponse,
} from './authTypes';
import { RootState } from '../../store';

export const login = createAsyncThunk<
  TokenObtainPairResponse,
  TokenObtainPairRequest,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await AuthService.login(credentials);
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message ?? 'Login failed');
  }
});

export const register = createAsyncThunk<
  UserProfile,
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await AuthService.register(credentials);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message ?? 'Registration failed'
    );
  }
});

export const refresh = createAsyncThunk<
  TokenRefreshResponse,
  void,
  { rejectValue: string }
>('auth/refresh', async (_, { rejectWithValue, getState }) => {
  try {
    const state: RootState = getState();
    const refreshToken = state.auth.refresh;
    if (!refreshToken) throw new Error('Refresh token not found');

    const refreshedData = await AuthService.refresh({ refresh: refreshToken });

    const { data } = refreshedData;

    return data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message ?? 'Token refresh failed'
    );
  }
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? 'Logout failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.getCurrentUser();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to fetch user'
      );
    }
  }
);

export const authActions = { login, register, logout, getCurrentUser };
