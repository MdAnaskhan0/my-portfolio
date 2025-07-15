import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import ProjectModal from '../../components/portfolioComponent/ProjectModel'

const Projects = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [selectedCategory, projects])

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/project`)
      setProjects(response.data.project)
      
      // Extract unique categories and add 'all' option
      const uniqueCategories = ['all', ...new Set(
        response.data.project.map(project => project.projectcategoryname)
      )]
      setCategories(uniqueCategories)
      
      setLoading(false)
    } catch (error) {
      console.error("Error fetching projects:", error)
      setLoading(false)
    }
  }

  const filterProjects = () => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(
        project => project.projectcategoryname === selectedCategory
      )
      setFilteredProjects(filtered)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">

      {/* Category Filter Section */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-start gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">We couldn't find any projects matching your selection.</p>
          <button 
            onClick={() => setSelectedCategory('all')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
          >
            View All Projects
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project._id}
              project={project}
              baseurl={baseurl}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          baseurl={baseurl}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

// Enhanced Project Card Component
const ProjectCard = ({ project, baseurl, onClick }) => {
  return (
    <div 
      className="group bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-800"
      onClick={onClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={project.projectImage ? `${baseurl}${project.projectImage}` : 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={project.projectname} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-medium">View Details</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-1">{project.projectname.slice(0, 20)}...</h3>
            <span className="inline-block text-yellow-500 text-xs rounded-md">
              {project.projectcategoryname}
            </span>
          </div>
          {project.projecturl && (
            <Link 
              to={project.projecturl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
              title="View Live"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects