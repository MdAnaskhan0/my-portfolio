import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;