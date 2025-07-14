import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiSave, FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateExparties = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    expartitemname: '',
    expartitemdescription: ''
  })
  const [loading, setLoading] = useState(false)

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
      const response = await axios.post(`${baseurl}/api/expart/create`, formData)
      toast.success('Expert created successfully!')
      navigate('/admin/exparties')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating expert')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Create New Expertise</h1>
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
              placeholder="Enter expertise name"
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
              placeholder="Enter detailed description"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <FiSave className="mr-2" />
              {loading ? 'Saving...' : 'Save Expertise'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateExparties