import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash,FaSearch , FaPlus, FaArrowLeft, FaGraduationCap, FaUniversity, FaCalendarAlt, FaSave, FaTimes, FaChalkboardTeacher } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEducation = () => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [educations, setEducations] = useState([]);
    const [formData, setFormData] = useState({
        degreename: '',
        majorname: '',
        yearofpassing: '',
        institutionname: '',
        cgpa: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (id) {
                    const response = await axios.get(`${base_url}/api/education/${id}`);
                    setFormData(response.data.educationMode);
                    setIsEditing(true);
                } else {
                    const response = await axios.get(`${base_url}/api/education`);
                    setEducations(response.data.educationMode);
                }
            } catch (error) {
                toast.error('Error fetching education data');
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if (isEditing) {
                await axios.put(`${base_url}/api/education/${id}`, formData);
                toast.success('Education updated successfully!');
            } else {
                await axios.post(`${base_url}/api/education`, formData);
                toast.success('Education added successfully!');
            }
            setTimeout(() => {
                navigate('/admin/education');
            }, 1500);
        } catch (error) {
            const errorMessage = error.response?.data?.message || `Error ${isEditing ? 'updating' : 'adding'} education`;
            toast.error(errorMessage);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this education record?')) {
            try {
                await axios.delete(`${base_url}/api/education/${id}`);
                setEducations(educations.filter(edu => edu._id !== id));
                toast.success('Education deleted successfully!');
            } catch (error) {
                toast.error('Error deleting education');
                console.error('Error:', error);
            }
        }
    };

    const filteredEducations = educations.filter(edu => 
        edu.degreename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.majorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.institutionname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto p-4 md:p-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                        <div className="flex items-center">
                            <FaGraduationCap className="text-3xl mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold">Update Education</h2>
                                <p className="text-blue-100">Edit the details below to update this education record</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <button 
                            onClick={() => navigate('/admin/education')}
                            className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <FaArrowLeft className="mr-2" /> Back to List
                        </button>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="form-group">
                                        <label className="block text-gray-700 font-medium mb-2">Degree Name</label>
                                        <div className="relative">
                                            <FiAward className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                name="degreename"
                                                value={formData.degreename}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="block text-gray-700 font-medium mb-2">Major Name</label>
                                        <div className="relative">
                                            <FaChalkboardTeacher className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                name="majorname"
                                                value={formData.majorname}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="form-group">
                                        <label className="block text-gray-700 font-medium mb-2">Year of Passing</label>
                                        <div className="relative">
                                            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                name="yearofpassing"
                                                value={formData.yearofpassing}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="block text-gray-700 font-medium mb-2">Institution Name</label>
                                        <div className="relative">
                                            <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                name="institutionname"
                                                value={formData.institutionname}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="form-group md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">CGPA</label>
                                    <input
                                        type="text"
                                        name="cgpa"
                                        value={formData.cgpa}
                                        onChange={handleChange}
                                        className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/education')}
                                    className="flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    <FaTimes className="mr-2" /> Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </span>
                                    ) : (
                                        <>
                                            <FaSave className="mr-2" /> Update Education
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <FaGraduationCap className="text-3xl mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold">Education Records</h2>
                                <p className="text-blue-100">Manage all education information</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/admin/education/create')}
                            className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                            <FaPlus className="mr-2" /> Add New
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <ToastContainer />
                    
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search educations..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredEducations.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredEducations.map((edu, idx) => (
                                        <tr key={edu._id || idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{edu.degreename}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {edu.majorname}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {edu.institutionname}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {edu.yearofpassing}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                {edu.cgpa}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/admin/education/${edu._id}`)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(edu._id)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                <FaGraduationCap className="mx-auto text-4xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                {searchTerm ? 'No matching records found' : 'No education records available'}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm ? 'Try a different search term' : 'Add a new education record to get started'}
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={() => navigate('/admin/education/create')}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FaPlus className="mr-2" /> Add Education
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateEducation;