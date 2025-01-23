import { apiService } from '../../api/api.service';
import type {
  RegisterRequest,
  TokenObtainPairRequest,
  TokenRefreshRequest,
} from './authTypes';

export class AuthService {
  static async login(credentials: TokenObtainPairRequest) {
    return await apiService.auth.authTokenObtainCreate({ ...credentials });
  }

  static async register(credentials: RegisterRequest) {
    return await apiService.auth.authRegisterCreate({ ...credentials });
  }

  static async refresh(credentials: TokenRefreshRequest) {
    return await apiService.auth.authTokenRefreshCreate({ ...credentials });
  }

  static async logout() {
    localStorage.removeItem('user');
  }

  static async getCurrentUser() {
    return await apiService.auth.authProfileRetrieve();
  }
}

console.log('AuthService loaded');
