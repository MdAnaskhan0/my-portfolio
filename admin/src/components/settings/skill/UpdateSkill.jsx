import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateSkill = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    skillname: '',
    skilldescription: '',
    skilllevel: 'Beginner'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/skill/${id}`)
        setFormData({
          skillname: response.data.skill.skillname,
          skilldescription: response.data.skill.skilldescription,
          skilllevel: response.data.skill.skilllevel
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching skill:', error)
        setError('Failed to load skill. Please try again later.')
        setLoading(false)
      }
    }
    fetchSkill()
  }, [baseurl, id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await axios.put(`${baseurl}/api/skill/${id}`, formData)
      setSuccessMessage('Skill updated successfully!')
      setTimeout(() => {
        navigate('/admin/skill') 
      }, 1500)
    } catch (error) {
      console.error('Error updating skill:', error)
      setError(error.response?.data?.message || 'Failed to update skill. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading skill data...</div>
  }

  if (error && !isSubmitting) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Skill</h2>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="skillname" className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              id="skillname"
              name="skillname"
              value={formData.skillname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="skilldescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="skilldescription"
              name="skilldescription"
              value={formData.skilldescription}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
            <div className="space-y-2">
              {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    type="radio"
                    id={`level-${level}`}
                    name="skilllevel"
                    value={level}
                    checked={formData.skilllevel === level}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`level-${level}`} className="ml-2 block text-sm text-gray-700">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/admin/skill')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isSubmitting ? 'Updating...' : 'Update Skill'}
            </button>
          </div>

          {error && isSubmitting && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default UpdateSkill