import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6">
      <nav className="flex flex-col space-y-4">
        <Link
          to="/admin"
          className={`text-lg font-medium ${
            isActive('/admin') ? 'text-primary' : 'text-gray-700 hover:text-primary'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/admins"
          className={`text-lg font-medium ${
            isActive('/admin/admins') ? 'text-primary' : 'text-gray-700 hover:text-primary'
          }`}
        >
          Admins
        </Link>
        <Link
          to="/admin/profile"
          className={`text-lg font-medium ${
            isActive('/admin/profile') ? 'text-primary' : 'text-gray-700 hover:text-primary'
          }`}
        >
          Profile
        </Link>

        {/* Menu Item */}
        Portfolio Setting
            {/* submenu */}
                User Profile
                    {/* submenus submenu */}
                        Create Profile
                        Profile View
                        update profile
                        Delete Profile

            {/* submenu */}
                Social Link
                    {/* submenus submenu */}
                        Create Link
                        All Links
                        update Link
                        Delete Link

      </nav>
    </aside>
  );
};

export default Sidebar;
