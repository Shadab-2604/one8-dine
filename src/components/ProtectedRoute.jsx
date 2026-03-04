import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './ui/LoadingSpinner';

const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useAuth();
  if (loading) return <LoadingSpinner />;
  return isAuthenticated && user?.role !== 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
