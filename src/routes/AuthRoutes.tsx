import { lazy } from 'react';
import { Loadable } from '@/components/layout/loadable';
import AuthLayout from '@/layouts/AuthLayout';

const LoginPage = Loadable(
  lazy(() => import('@/features/auth/pages/LoginPage'))
);

const SignupPage = Loadable(
lazy(() => import('@/features/auth/pages/SignupPage'))
)

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
  ],
};

export default AuthRoutes;
