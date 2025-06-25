import { createContext, useContext, useEffect, useState } from 'react';
import adminApi from '../api/adminApi';
import { toast } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const profile = await adminApi.getAdminProfile();
          setAdmin(profile.admin);
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('adminToken');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { token } = await adminApi.loginAdmin(credentials);
      const decoded = jwtDecode(token);
      const profile = await adminApi.getAdminProfile();
      setAdmin(profile.admin);
      toast.success('Login successful');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await adminApi.logoutAdmin();
      setAdmin(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);