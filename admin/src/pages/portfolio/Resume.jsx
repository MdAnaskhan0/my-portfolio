import React from 'react'
import Education from '../../components/portfolioComponent/Resume/Education'
import Experience from '../../components/portfolioComponent/Resume/Experience'
import Skill from '../../components/portfolioComponent/Resume/Skill'
import { FiBook, FiBriefcase, FiAward } from 'react-icons/fi'

const Resume = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-col gap-8">

        {/* Experience */}
        <div className="bg-gray-900 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gray-800 p-3 rounded-full mr-4">
              <FiBriefcase className="text-yellow-600 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-100">Experience</h2>
          </div>
          <Experience />
        </div>

        {/* Education */}
        <div className="bg-gray-900 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gray-800 p-3 rounded-full mr-4">
              <FiBook className="text-yellow-500 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-100">Education</h2>
          </div>
          <Education />
        </div>

        {/* Skills */}
        <div className="bg-gray-900 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gray-800 p-3 rounded-full mr-4">
              <FiAward className="text-yellow-600 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-100">Skills</h2>
          </div>
          <Skill />
        </div>
      </div>
    </div>
  )
}

export default Resume