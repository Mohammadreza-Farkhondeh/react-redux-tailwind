import { apiService } from '../../api/api.service';
import type {
  SignupRequest,
  SignupResponse,
  TokenObtainRequest,
  TokenRefreshRequest,
  TokenResponse,
  UserOut
} from './authTypes';

class AuthError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class AuthService {
  static async login(
    credentials: TokenObtainRequest & { rememberMe?: boolean }
  ): Promise<TokenResponse> {
    try {
      const response = await apiService.auth.obtainTokenAuthTokenObtainPost(credentials);

      if (credentials.rememberMe) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
      } else {
        sessionStorage.setItem('accessToken', response.data.access);
        sessionStorage.setItem('refreshToken', response.data.refresh);
      }

      return response.data;
    } catch (error) {
      throw new AuthError(
        error.response?.data?.message || 'Login failed',
        error.response?.status
      );
    }
  }

  static async signup(credentials: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await apiService.auth.signupUserAuthSignupPost(credentials);
      return response.data;
    } catch (error) {
      throw new AuthError(
        error.response?.data?.message || 'Registration failed',
        error.response?.status
      );
    }
  }

  static async refresh(
    credentials: TokenRefreshRequest
  ): Promise<TokenResponse> {
    try {
      const response =
        await apiService.auth.refreshTokenAuthTokenRefreshPost(credentials);
      return response.data;
    } catch (error) {
      throw new AuthError(
        error.response?.data?.message || 'Token refresh failed',
        error.response?.status
      );
    }
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('rememberedEmail');
  }

  static async getCurrentUser(): Promise<UserOut> {
    try {
      const response = await apiService.auth.authProfileRetrieve();
      return response.data;
    } catch (error) {
      throw new AuthError(
        error.response?.data?.message || 'Failed to fetch user profile',
        error.response?.status
      );
    }
  }

  static getStoredTokens(): { access: string | null; refresh: string | null } {
    return {
      access:
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken'),
      refresh:
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken'),
    };
  }
}
