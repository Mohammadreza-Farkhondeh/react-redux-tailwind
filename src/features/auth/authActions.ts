import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from './authService';
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  MeResponse,
} from './authTypes';

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await AuthService.login(credentials);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message ?? 'Login failed');
  }
});

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await AuthService.register(credentials);
    // localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message ?? 'Registration failed'
    );
  }
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? 'Logout failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk<MeResponse>(
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
