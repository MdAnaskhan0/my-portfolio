import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? '' : menu));
  };

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6 overflow-y-auto">
      <nav className="flex flex-col space-y-4">
        {/* Top Level Navigation */}
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

        {/* Portfolio Setting */}
        <div>
          <button
            onClick={() => toggleMenu('portfolio')}
            className="text-lg font-semibold text-gray-800 hover:text-primary"
          >
            Portfolio Setting
          </button>

          {openMenu === 'portfolio' && (
            <div className="ml-4 mt-2 space-y-3 text-sm">

              {/* User Profile */}
              <div>
                <p className="font-medium">User Profile</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/profile/create" className="block hover:text-primary">Create Profile</Link>
                  <Link to="/admin/profile/view" className="block hover:text-primary">Profile View</Link>
                </div>
              </div>

              {/* Social Link */}
              <div>
                <p className="font-medium">Social Link</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/social/create" className="block hover:text-primary">Create Link</Link>
                  <Link to="/admin/social" className="block hover:text-primary">All Links</Link>
                </div>
              </div>

              {/* Education */}
              <div>
                <p className="font-medium">Education</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/education/create" className="block hover:text-primary">Create Education</Link>
                  <Link to="/admin/education" className="block hover:text-primary">Educations</Link>
                </div>
              </div>

              {/* Experience */}
              <div>
                <p className="font-medium">Experience</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/experience/create" className="block hover:text-primary">Create Experience</Link>
                  <Link to="/admin/experience" className="block hover:text-primary">Experiences</Link>
                </div>
              </div>

              {/* Exparties */}
              <div>
                <p className="font-medium">Exparties</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/exparties/create" className="block hover:text-primary">Create Exparties</Link>
                  <Link to="/admin/exparties" className="block hover:text-primary">Exparties</Link>
                </div>
              </div>

              {/* Skill */}
              <div>
                <p className="font-medium">Skill</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/skill/create" className="block hover:text-primary">Create Skill</Link>
                  <Link to="/admin/skill" className="block hover:text-primary">Skills</Link>
                </div>
              </div>

              {/* Publication */}
              <div>
                <p className="font-medium">Publication</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/publication/create" className="block hover:text-primary">Create Publication</Link>
                  <Link to="/admin/publication" className="block hover:text-primary">Publications</Link>
                </div>
              </div>

              {/* Project Category */}
              <div>
                <p className="font-medium">Project Category</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/project-category/create" className="block hover:text-primary">Create Project Category</Link>
                  <Link to="/admin/project-category" className="block hover:text-primary">Project Categories</Link>
                </div>
              </div>

              {/* Project */}
              <div>
                <p className="font-medium">Project</p>
                <div className="ml-4 space-y-1">
                  <Link to="/admin/project/create" className="block hover:text-primary">Create Project</Link>
                  <Link to="/admin/project" className="block hover:text-primary">Projects</Link>
                </div>
              </div>

            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
