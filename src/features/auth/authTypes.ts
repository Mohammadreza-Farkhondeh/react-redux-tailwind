import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  MeResponse,
} from '../../api/Api';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  MeResponse,
  User,
};
