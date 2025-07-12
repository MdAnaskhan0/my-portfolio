import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navlink = () => {
  const location = useLocation();
  
  // Define base and active styles
  const baseStyle = "transition-colors duration-300 p-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-base font-semibold";
  const inactiveStyle = "text-gray-300 hover:text-yellow-500 hover:bg-gray-800";
  const activeStyle = "text-yellow-500 bg-gray-800";
  
  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <nav className="flex flex-row gap-1 sm:gap-2">
      <Link 
        to='/' 
        className={`${baseStyle} ${isActive('/') ? activeStyle : inactiveStyle}`}
      >
        About Me
      </Link>
      <Link 
        to='/resume' 
        className={`${baseStyle} ${isActive('/resume') ? activeStyle : inactiveStyle}`}
      >
        Resume
      </Link>
      <Link 
        to='/projects' 
        className={`${baseStyle} ${isActive('/projects') ? activeStyle : inactiveStyle}`}
      >
        Projects
      </Link>
      <Link 
        to='/contact' 
        className={`${baseStyle} ${isActive('/contact') ? activeStyle : inactiveStyle}`}
      >
        Contact
      </Link>
    </nav>
  );
};

export default Navlink;