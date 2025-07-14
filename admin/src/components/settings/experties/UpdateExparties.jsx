import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { FiSave, FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UpdateExparties = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    expartitemname: '',
    expartitemdescription: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/expart/${id}`)
        setFormData({
          expartitemname: response.data.expert.expartitemname,
          expartitemdescription: response.data.expert.expartitemdescription
        })
        setFetching(false)
      } catch (error) {
        toast.error('Error fetching expertise details')
        navigate('/admin/exparties')
      }
    }
    fetchExpert()
  }, [id, baseurl, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.put(`${baseurl}/api/expart/${id}`, formData)
      toast.success('Expertise updated successfully!')
      navigate('/admin/exparties')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating expertise')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Update Expertise</h1>
            <Link to="/admin/exparties" className="flex items-center text-white hover:text-blue-200">
              <FiArrowLeft className="mr-1" /> Back to List
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="expartitemname" className="block text-gray-700 font-medium mb-2">
              Expertise Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="expartitemname"
              name="expartitemname"
              value={formData.expartitemname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="expartitemdescription" className="block text-gray-700 font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="expartitemdescription"
              name="expartitemdescription"
              value={formData.expartitemdescription}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <FiSave className="mr-2" />
              {loading ? 'Updating...' : 'Update Expertise'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateExparties