import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiUpload, FiX, FiPlus } from 'react-icons/fi'

const CreateProject = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    projectname: '',
    projectdescription: '',
    projectcategoryname: '',
    projecturl: '',
    projectImage: null
  })
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/projectcategory`)
        setCategories(response.data.projectCategory)
      } catch (error) {
        toast.error('Failed to load categories')
      }
    }
    fetchCategories()
  }, [baseurl])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        projectImage: file
      }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      projectImage: null
    }))
    setPreviewImage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('projectname', formData.projectname)
      formDataToSend.append('projectdescription', formData.projectdescription)
      formDataToSend.append('projectcategoryname', formData.projectcategoryname)
      formDataToSend.append('projecturl', formData.projecturl)
      if (formData.projectImage) {
        formDataToSend.append('projectImage', formData.projectImage)
      }

      const response = await axios.post(`${baseurl}/api/project/create`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.success('Project created successfully!')
      setFormData({
        projectname: '',
        projectdescription: '',
        projectcategoryname: '',
        projecturl: '',
        projectImage: null
      })
      setPreviewImage(null)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Create New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name*</label>
            <input
              type="text"
              name="projectname"
              value={formData.projectname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Category*</label>
            <select
              name="projectcategoryname"
              value={formData.projectcategoryname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.projectcategoryname}>
                  {category.projectcategoryname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Description*</label>
          <textarea
            name="projectdescription"
            value={formData.projectdescription}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
          <input
            type="url"
            name="projecturl"
            value={formData.projecturl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Image*</label>
          {previewImage ? (
            <div className="relative w-full max-w-xs">
              <img src={previewImage} alt="Preview" className="w-full h-auto rounded-md border border-gray-300" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              'Creating...'
            ) : (
              <>
                <FiPlus className="mr-2" />
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProject