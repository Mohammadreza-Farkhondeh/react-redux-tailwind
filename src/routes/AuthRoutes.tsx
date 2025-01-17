import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const LoginPage = Loadable(lazy(() => import('features/auth/pages/LoginPage')));
const SignupPage = Loadable(lazy(() => import('features/auth/pages/SignupPage')));


const AuthRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <SignupPage />
    }
  ]
};

export default AuthRoutes;