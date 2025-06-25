import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { admin } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Welcome, {admin?.name}</h2>
          <p className="text-gray-600">You're logged in as an admin.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <ul className="space-y-2">
            <li>
              <a href="/admins" className="text-primary hover:underline">
                Manage Admins
              </a>
            </li>
            <li>
              <a href="/profile" className="text-primary hover:underline">
                Update Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;