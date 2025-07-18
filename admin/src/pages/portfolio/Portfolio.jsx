import React from 'react';
import Sidebar from '../../components/portfolioComponent/Sidebar';
import Navlink from '../../components/portfolioComponent/Navlink';
import PathDisplay from '../../components/portfolioComponent/PathDisplay';
import { Outlet } from 'react-router-dom';

const Portfolio = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto p-4 md:p-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - fixed height that matches viewport */}
          <aside className="w-full lg:w-3/12 lg:sticky lg:top-16 lg:h-[calc(100vh-7rem)]">
            <Sidebar />
          </aside>
          
          {/* Main content - scrollable */}
          <main className="w-full lg:w-9/12 bg-gray-900 rounded-lg p-6 shadow-lg border-1 border-gray-700 overflow-y-auto">
            {/* Top Navigation Section - hide Navlink on mobile */}
            <div className="hidden sm:flex justify-between items-center py-2 sm:py-4 sm:px-6 border-b border-gray-700">
              <PathDisplay />
              <Navlink />
            </div>

            {/* Show PathDisplay alone on mobile */}
            <div className="sm:hidden py-2 px-6 border-b border-gray-700">
              <PathDisplay />
            </div>

            {/* Main Content Section */}
            <div className="py-6">
              <Outlet />
            </div>

            {/* Mobile Navigation at bottom */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-900 p-4 border-t border-gray-700 z-10">
              <Navlink mobileLayout={true} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;