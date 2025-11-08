import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles specified and user doesn't have the right role
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to appropriate dashboard based on their actual role
    if (role === "farmer") {
      return <Navigate to="/farmer/dashboard" replace />;
    } else if (role === "buyer") {
      return <Navigate to="/buyer/dashboard" replace />;
    } else if (role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      // No role assigned, send to home to select
      return <Navigate to="/home" replace />;
    }
  }

  // User is authenticated and has correct role
  return children;
}
