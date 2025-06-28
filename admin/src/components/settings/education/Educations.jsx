import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Educations = () => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [educations, setEducations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const response = await axios.get(`${base_url}/api/education`);
                setEducations(response.data.educationMode);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching educations:', error);
                toast.error('Failed to load education data');
                setIsLoading(false);
            }
        };

        fetchEducations();
    }, []);

    const filteredEducations = educations.filter(edu => 
        edu.degreename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.majorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.institutionname.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                                    <Link
                                                        to={`/admin/education/${edu._id}`}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this education record?')) {
                                                                axios.delete(`${base_url}/api/education/${edu._id}`)
                                                                    .then(() => {
                                                                        setEducations(educations.filter(e => e._id !== edu._id));
                                                                        toast.success('Education deleted successfully');
                                                                    })
                                                                    .catch(error => {
                                                                        console.error('Error deleting education:', error);
                                                                        toast.error('Failed to delete education');
                                                                    });
                                                            }
                                                        }}
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

export default Educations;