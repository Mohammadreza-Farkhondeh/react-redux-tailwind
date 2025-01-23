import { lazy } from 'react';
import { Loadable } from '@/components/layout/loadable';
import AuthLayout from '@/layouts/AuthLayout';

const LoginPage = Loadable(
  lazy(() => import('@/features/auth/pages/LoginPage'))
);

const SignupPage = Loadable(
  lazy(() => import('@/features/auth/pages/SignupPage'))
);

const ForgotPasswordPage = Loadable(
  lazy(() => import('@/features/auth/pages/ForgotPasswordPage'))
);

const ResetPasswordPage = Loadable(
  lazy(() => import('@/features/auth/pages/ResetPasswordPage'))
);

const EmailVerificationPage = Loadable(
  lazy(() => import('@/features/auth/pages/EmailVerificationPage'))
);

const AuthRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/reset-password',
      element: <ResetPasswordPage />,
    },
    {
      path: '/verify-email',
      element: <EmailVerificationPage />,
    },
  ],
};

export default AuthRoutes;
