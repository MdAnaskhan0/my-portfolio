import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiUser, 
  FiBriefcase, 
  FiBook, 
  FiAward, 
  FiCode, 
  FiFileText, 
  FiLayers,
  FiFolder,
  FiChevronDown,
  FiChevronRight,
  FiSettings
} from 'react-icons/fi';

const Sidebar = () => {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? '' : menu));
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 min-h-screen p-4 overflow-y-auto">
      <div className="mb-8 p-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FiSettings className="mr-2" /> Admin Panel
        </h2>
      </div>
      
      <nav className="flex flex-col space-y-1">
        {/* Top Level Navigation */}
        <Link
          to="/admin"
          className={`flex items-center p-3 rounded-lg transition-all ${
            isActive('/admin') 
              ? 'bg-primary bg-opacity-10 text-primary font-medium' 
              : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
          }`}
        >
          <FiHome className="mr-3" />
          Dashboard
        </Link>
        
        <Link
          to="/admin/admins"
          className={`flex items-center p-3 rounded-lg transition-all ${
            isActive('/admin/admins') 
              ? 'bg-primary bg-opacity-10 text-primary font-medium' 
              : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
          }`}
        >
          <FiUsers className="mr-3" />
          Admins
        </Link>
        
        <Link
          to="/admin/profile"
          className={`flex items-center p-3 rounded-lg transition-all ${
            isActive('/admin/profile') 
              ? 'bg-primary bg-opacity-10 text-primary font-medium' 
              : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
          }`}
        >
          <FiUser className="mr-3" />
          Profile
        </Link>

        {/* Portfolio Setting */}
        <div>
          <button
            onClick={() => toggleMenu('portfolio')}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
              openMenu === 'portfolio' 
                ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
            }`}
          >
            <div className="flex items-center">
              <FiBriefcase className="mr-3" />
              <span>Portfolio Settings</span>
            </div>
            {openMenu === 'portfolio' ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {openMenu === 'portfolio' && (
            <div className="ml-8 mt-1 space-y-1">
              {/* User Profile */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Portfolio Profile</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/profile/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/profile/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Profile
                  </Link>
                  <Link 
                    to="/admin/profile/view" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/profile/view') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Profile View
                  </Link>
                </div>
              </div>

              {/* Social Link */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Social Links</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/social/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/social/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Link
                  </Link>
                  <Link 
                    to="/admin/social" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/social') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    All Links
                  </Link>
                </div>
              </div>

              {/* Education */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Education</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/education/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/education/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Education
                  </Link>
                  <Link 
                    to="/admin/education" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/education') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Educations
                  </Link>
                </div>
              </div>

              {/* Experience */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Experience</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/experience/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/experience/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Experience
                  </Link>
                  <Link 
                    to="/admin/experience" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/experience') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Experiences
                  </Link>
                </div>
              </div>

              {/* Exparties */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Expertise</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/exparties/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/exparties/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Expertise
                  </Link>
                  <Link 
                    to="/admin/exparties" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/exparties') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Expertise List
                  </Link>
                </div>
              </div>

              {/* Skill */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Skills</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/skill/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/skill/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Skill
                  </Link>
                  <Link 
                    to="/admin/skill" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/skill') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Skills List
                  </Link>
                </div>
              </div>

              {/* Publication */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Publications</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/publication/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/publication/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Publication
                  </Link>
                  <Link 
                    to="/admin/publication" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/publication') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Publications
                  </Link>
                </div>
              </div>

              {/* Project Category */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Project Categories</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/project-category/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/project-category/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Category
                  </Link>
                  <Link 
                    to="/admin/project-category" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/project-category') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Categories
                  </Link>
                </div>
              </div>

              {/* Project */}
              <div className="pt-2">
                <p className="text-xs uppercase font-semibold text-gray-500 px-3 mb-1">Projects</p>
                <div className="space-y-1">
                  <Link 
                    to="/admin/project/create" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/project/create') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Create Project
                  </Link>
                  <Link 
                    to="/admin/project" 
                    className={`block p-2 rounded-lg text-sm ${
                      isActive('/admin/project') 
                        ? 'bg-primary bg-opacity-10 text-primary' 
                        : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                    }`}
                  >
                    Projects
                  </Link>
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