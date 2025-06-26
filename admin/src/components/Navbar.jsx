import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { admin, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-primary">
        Portfolio Admin
      </Link>
      {admin && (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
