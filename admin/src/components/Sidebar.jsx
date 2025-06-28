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
  FiSettings,
  FiLink2,
  FiBookmark,
  FiActivity,
  FiTool
} from 'react-icons/fi';

const Sidebar = () => {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  const [openMenus, setOpenMenus] = useState({
    portfolio: false,
    profile: false,
    social: false,
    education: false,
    experience: false,
    expertise: false,
    skills: false,
    publications: false,
    projectCategories: false,
    projects: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
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
              openMenus.portfolio 
                ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
            }`}
          >
            <div className="flex items-center">
              <FiBriefcase className="mr-3" />
              <span>Portfolio Settings</span>
            </div>
            {openMenus.portfolio ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {openMenus.portfolio && (
            <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
              {/* Portfolio Profile */}
              <div>
                <button
                  onClick={() => toggleMenu('profile')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.profile 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiUser className="mr-2 text-xs" />
                    <span>Portfolio Profile</span>
                  </div>
                  {openMenus.profile ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.profile && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/profile/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/profile/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Profile
                    </Link>
                    <Link 
                      to="/admin/profile/view" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/profile/view') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Profile View
                    </Link>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div>
                <button
                  onClick={() => toggleMenu('social')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.social 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiLink2 className="mr-2 text-xs" />
                    <span>Social Links</span>
                  </div>
                  {openMenus.social ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.social && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/social/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/social/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Link
                    </Link>
                    <Link 
                      to="/admin/social" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/social') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      All Links
                    </Link>
                  </div>
                )}
              </div>

              {/* Education */}
              <div>
                <button
                  onClick={() => toggleMenu('education')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.education 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiBook className="mr-2 text-xs" />
                    <span>Education</span>
                  </div>
                  {openMenus.education ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.education && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/education/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/education/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Education
                    </Link>
                    <Link 
                      to="/admin/education" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/education') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Educations
                    </Link>
                  </div>
                )}
              </div>

              {/* Experience */}
              <div>
                <button
                  onClick={() => toggleMenu('experience')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.experience 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiActivity className="mr-2 text-xs" />
                    <span>Experience</span>
                  </div>
                  {openMenus.experience ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.experience && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/experience/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/experience/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Experience
                    </Link>
                    <Link 
                      to="/admin/experience" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/experience') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Experiences
                    </Link>
                  </div>
                )}
              </div>

              {/* Expertise */}
              <div>
                <button
                  onClick={() => toggleMenu('expertise')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.expertise 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiTool className="mr-2 text-xs" />
                    <span>Expertise</span>
                  </div>
                  {openMenus.expertise ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.expertise && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/exparties/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/exparties/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Expertise
                    </Link>
                    <Link 
                      to="/admin/exparties" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/exparties') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Expertise List
                    </Link>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                <button
                  onClick={() => toggleMenu('skills')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.skills 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiCode className="mr-2 text-xs" />
                    <span>Skills</span>
                  </div>
                  {openMenus.skills ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.skills && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/skill/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/skill/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Skill
                    </Link>
                    <Link 
                      to="/admin/skill" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/skill') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Skills List
                    </Link>
                  </div>
                )}
              </div>

              {/* Publications */}
              <div>
                <button
                  onClick={() => toggleMenu('publications')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.publications 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiBookmark className="mr-2 text-xs" />
                    <span>Publications</span>
                  </div>
                  {openMenus.publications ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.publications && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/publication/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/publication/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Publication
                    </Link>
                    <Link 
                      to="/admin/publication" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/publication') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Publications
                    </Link>
                  </div>
                )}
              </div>

              {/* Project Categories */}
              <div>
                <button
                  onClick={() => toggleMenu('projectCategories')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.projectCategories 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiLayers className="mr-2 text-xs" />
                    <span>Project Categories</span>
                  </div>
                  {openMenus.projectCategories ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.projectCategories && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/project-category/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/project-category/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Category
                    </Link>
                    <Link 
                      to="/admin/project-category" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/project-category') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Categories
                    </Link>
                  </div>
                )}
              </div>

              {/* Projects */}
              <div>
                <button
                  onClick={() => toggleMenu('projects')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${
                    openMenus.projects 
                      ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                      : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiFolder className="mr-2 text-xs" />
                    <span>Projects</span>
                  </div>
                  {openMenus.projects ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {openMenus.projects && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    <Link 
                      to="/admin/project/create" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/project/create') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Create Project
                    </Link>
                    <Link 
                      to="/admin/project" 
                      className={`block p-2 rounded-lg text-xs ${
                        isActive('/admin/project') 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'text-gray-600 hover:bg-gray-200 hover:bg-opacity-50'
                      }`}
                    >
                      Projects
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;