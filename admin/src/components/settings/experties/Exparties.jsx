import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Exparties = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  const [exparties, setExparties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchExparties()
  }, [])

  const fetchExparties = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/expart`)
      setExparties(response.data.expert)
      setLoading(false)
    } catch (error) {
      toast.error('Error fetching expertises')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expertise?')) {
      try {
        await axios.delete(`${baseurl}/api/expart/${id}`)
        toast.success('Expertise deleted successfully')
        fetchExparties()
      } catch (error) {
        toast.error('Error deleting expertise')
      }
    }
  }

  const filteredExparties = exparties.filter(expert =>
    expert.expartitemname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.expartitemdescription.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Expertise Management</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search expertises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Link
              to="/admin/exparties/create"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiPlus className="mr-2" /> Add New
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExparties.length > 0 ? (
                    filteredExparties.map((expert) => (
                      <tr key={expert._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{expert.expartitemname}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-600 line-clamp-2">{expert.expartitemdescription}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => navigate(`/admin/exparties/update/${expert._id}`)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FiEdit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(expert._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                        {searchTerm ? 'No matching expertises found' : 'No expertises available'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Exparties