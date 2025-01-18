import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const registerSchema = loginSchema
  .extend({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export type {
  TokenResponse as TokenObtainPairResponse,
  TokenResponse as TokenRefreshResponse,
};

export type TokenObtainPairRequest = LoginFormData;
export type TokenRefreshRequest = { refresh: string };
export type RegisterRequest = RegisterFormData;
