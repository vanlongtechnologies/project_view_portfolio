import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status when route changes
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}

export default PrivateRoute;