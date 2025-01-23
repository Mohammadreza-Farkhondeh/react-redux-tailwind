import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../store';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
