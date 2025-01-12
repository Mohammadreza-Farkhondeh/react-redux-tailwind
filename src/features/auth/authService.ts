import { apiService } from '../../api/api.service';
import type { LoginRequest, RegisterRequest } from './authTypes';

export class AuthService {
  static async login(credentials: LoginRequest) {
    return await apiService.auth.login({ data: credentials });
  }

  static async register(credentials: RegisterRequest) {
    return await apiService.auth.register({ data: credentials });
  }

  static async logout() {
    return await apiService.auth.logout();
  }

  static async getCurrentUser() {
    return await apiService.auth.me();
  }
}

console.log('AuthService loaded');
