import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiUpload, FiX, FiSave } from 'react-icons/fi'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProject = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams()
  const navigate = useNavigate()
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
  const [currentImage, setCurrentImage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get(`${baseurl}/api/projectcategory`)
        setCategories(categoriesResponse.data)

        // Fetch project data
        const projectResponse = await axios.get(`${baseurl}/api/project/${id}`)
        const project = projectResponse.data.project
        setFormData({
          projectname: project.projectname,
          projectdescription: project.projectdescription,
          projectcategoryname: project.projectcategoryname,
          projecturl: project.projecturl || '',
          projectImage: null
        })
        setCurrentImage(project.projectImage)
      } catch (error) {
        toast.error('Failed to load project data')
        navigate('/projects')
      }
    }
    fetchData()
  }, [baseurl, id, navigate])

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

      const response = await axios.put(`${baseurl}/api/project/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.success('Project updated successfully!')
      navigate('/projects')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Update Project</h1>
      
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
                <option key={category._id} value={category.categoryname}>
                  {category.categoryname}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
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
          ) : currentImage ? (
            <div className="relative w-full max-w-xs">
              <img src={`${baseurl}${currentImage}`} alt="Current" className="w-full h-auto rounded-md border border-gray-300" />
              <div className="mt-2">
                <label className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200">
                  <FiUpload className="mr-2" />
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
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
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              'Updating...'
            ) : (
              <>
                <FiSave className="mr-2" />
                Update Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProject