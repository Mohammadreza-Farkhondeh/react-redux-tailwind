import type {
  TokenObtainPairRequest,
  TokenObtainPairResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  RegisterRequest,
  UserProfile,
} from '../../api/Api';

export interface AuthState {
  user: UserProfile | null;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export type {
  TokenObtainPairRequest,
  TokenObtainPairResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  RegisterRequest,
  UserProfile,
};
