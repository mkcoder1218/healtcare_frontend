import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../interfaces';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  // Add detailed debugging
  console.log('ProtectedRoute - Auth state:', { 
    isAuthenticated, 
    userExists: !!user, 
    userRole: user?.role,
    requiredRole,
    loading
  });
  
  // Show loading state if auth is still loading
  if (loading) {
    console.log('ProtectedRoute - Still loading auth state');
    return <div className="p-4">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // Check role requirement if specified
  if (requiredRole && user.role !== requiredRole) {
    console.log(`ProtectedRoute - User role (${user.role}) doesn't match required role (${requiredRole}), redirecting to home`);
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated and has required role (if specified)
  console.log('ProtectedRoute - Access granted');
  return <>{children}</>;
};

export default ProtectedRoute; 