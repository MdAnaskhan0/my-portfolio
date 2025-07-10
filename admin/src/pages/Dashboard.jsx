import { useAuth } from '../context/AuthContext';
import { FaUserShield, FaTachometerAlt, FaUsersCog, FaUserEdit, FaChartLine, FaCog, FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { admin } = useAuth();

  const showComingSoon = () => {
    toast.info('This feature is coming soon!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <FaTachometerAlt className="text-indigo-600 text-2xl mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
              <FaBell className="text-lg" />
            </button>
            <button className="p-2 rounded-full bg-white shadow text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
              <FaCog className="text-lg" />
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, {admin?.name}!</h2>
              <p className="text-indigo-100">Here's what's happening with your platform today.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center bg-white text-black bg-opacity-20 rounded-full px-4 py-2">
              <FaUserShield className="mr-2" />
              <span>Admin</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">1,248</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FaUsersCog />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">+12% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Sessions</p>
                <h3 className="text-2xl font-bold mt-1">86</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FaChartLine />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">+5% from yesterday</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Tasks</p>
                <h3 className="text-2xl font-bold mt-1">14</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <FaCog />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">-3 from last week</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">Reports</p>
                <h3 className="text-2xl font-bold mt-1">7</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full text-red-600">
                <FaBell />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">+2 new today</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <FaUsersCog className="text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Admin Management</h2>
            </div>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/admin/admins" 
                  className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Manage Admin Accounts
                </a>
              </li>
              <li>
                <a 
                  href="/admin/admins/create" 
                  className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Create New Admin
                </a>
              </li>
              <li>
                <button 
                  onClick={showComingSoon}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  View Admin Activity Logs
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-4">
              <FaUserEdit className="text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Profile & Settings</h2>
            </div>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/admin/profile" 
                  className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Update Profile Information
                </a>
              </li>
              <li>
                <button 
                  onClick={showComingSoon}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Change Password
                </button>
              </li>
              <li>
                <button 
                  onClick={showComingSoon}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Notification Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;