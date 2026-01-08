import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('BUYER' | 'WHOLESALER' | 'ADMIN')[];
  requireApproved?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles,
  requireApproved = false 
}: ProtectedRouteProps) {
  const location = useLocation();
  const user = auth.getUser();
  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={auth.getRedirectPath(user)} replace />;
  }

  if (requireApproved && user.role === 'WHOLESALER' && user.status !== 'APPROVED') {
    return <Navigate to="/pending" replace />;
  }

  return <>{children}</>;
}
