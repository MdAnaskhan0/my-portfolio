import React from 'react'
import { Link } from 'react-router-dom';

const ProjectModal = ({ project, baseurl, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative border border-gray-800 rounded-xl shadow-2xl">
                    <img
                        src={project.projectImage ? `${baseurl}${project.projectImage}` : 'https://via.placeholder.com/800x400?text=No+Image'}
                        alt={project.projectname}
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                        }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/90 text-gray-800 rounded-full w-9 h-9 flex items-center justify-center hover:bg-white transition-colors shadow-md cursor-pointer"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-100 mb-2">{project.projectname}</h2>
                            <span className="inline-block text-yellow-500 text-sm py-1 rounded-md">
                                {project.projectcategoryname}
                            </span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-400">
                        {project.projectdescription.split('\n').map((paragraph, i) => (
                            <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                        ))}
                    </div>

                    <div className='flex justify-start mt-5'>
                        {project.projecturl && (
                            <Link
                                to={project.projecturl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md transition-colors shadow-sm whitespace-nowrap"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Live Project
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal