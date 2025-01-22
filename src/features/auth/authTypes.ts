import { z } from 'zod';
import type {
  TokenObtainPairRequest,
  TokenObtainPairResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  RegisterRequest,
  UserProfile,
} from '@/api/Api';

export interface LoginFormData extends TokenObtainPairRequest {
  rememberMe?: boolean;
}

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .max(254, 'Email must be 254 characters or less'),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(150, 'Username must be 150 characters or less')
      .regex(
        /^[\w.@+-]+$/,
        'Username can only contain letters, numbers, and @/./+/-/_'
      ),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address' })
      .max(254, 'Email must be 254 characters or less'),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type {
  UserProfile,
  TokenObtainPairResponse,
  TokenObtainPairRequest,
  TokenRefreshRequest,
  TokenRefreshResponse,
  RegisterRequest,
};

export type LoginFormFields = z.infer<typeof loginSchema>;
export type RegisterFormFields = z.infer<typeof registerSchema>;

export interface AuthState {
  user: UserProfile | null;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
