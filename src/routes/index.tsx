import { createBrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';

const router = createBrowserRouter([AuthRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;