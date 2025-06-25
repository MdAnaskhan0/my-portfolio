import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { admin, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Portfolio Admin
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary">
            Dashboard
          </Link>
          <Link to="/admins" className="text-gray-700 hover:text-primary">
            Admins
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-primary">
            Profile
          </Link>
          {admin && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;