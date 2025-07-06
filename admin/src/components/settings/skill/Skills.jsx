import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Skills = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/skill`)
        setSkills(response.data.skill)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching skills:', error)
        setError('Failed to load skills. Please try again later.')
        setLoading(false)
      }
    }
    fetchSkills()
  }, [baseurl])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        const response = await axios.delete(`${baseurl}/api/skill/${id}`)
        toast.success(response.data.message || 'Skill deleted successfully!')
        // Refresh the skills list after deletion
        setSkills(skills.filter(skill => skill._id !== id))
      } catch (error) {
        console.error('Error deleting skill:', error)
        toast.error(error.response?.data?.message || 'Failed to delete skill. Please try again.')
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading skills...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (!skills || skills.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">My Skills</h2>
          <Link 
            to="/admin/skill/create" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add New Skill
          </Link>
        </div>
        <div className="text-center py-8">No skills found.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Skills</h2>
        <Link 
          to="/admin/skill/create" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Skill
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {skills.map((skill) => (
              <tr key={skill._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{skill.skillname}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{skill.skilldescription}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    skill.skilllevel === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                    skill.skilllevel === 'Intermediate' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {skill.skilllevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/admin/skill/${skill._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(skill._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Skills