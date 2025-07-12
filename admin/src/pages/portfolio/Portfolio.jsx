import React from 'react';
import Sidebar from '../../components/portfolioComponent/Sidebar';

const Portfolio = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto p-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-3/12">
            <Sidebar />
          </aside>
          
          <main className="w-full lg:w-9/12 bg-[#1E1E1F] rounded-lg p-6 shadow-lg">
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to My Portfolio</h2>
              <p className="text-gray-300">Select a section from the sidebar to view my work and details</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;