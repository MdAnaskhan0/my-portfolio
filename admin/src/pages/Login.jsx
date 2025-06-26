import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-gray-900">Admin Login</h2>
        <LoginForm
          credentials={credentials}
          setCredentials={setCredentials}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;