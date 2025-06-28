import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaSave, FaTimes, FaChalkboardTeacher } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEducation = () => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        degreename: '',
        majorname: '',
        yearofpassing: '',
        institutionname: '',
        cgpa: ''
    });
    const [isLoading, setIsLoading] = useState(false);

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
            const response = await axios.post(`${base_url}/api/education/create`, formData);
            toast.success('Education created successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                navigate('/admin/education');
            }, 2000);
        } catch (error) {
            console.error('Error creating education:', error);
            const errorMessage = error.response?.data?.message || 'Error creating education';
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1); 
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-3xl mr-3" />
                        <div>
                            <h2 className="text-2xl font-bold">Add Education</h2>
                            <p className="text-blue-100">Fill in the details below to add a new education record</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-6">
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="form-group">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="degreename">
                                        Degree Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FiAward className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            id="degreename"
                                            name="degreename"
                                            value={formData.degreename}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            placeholder="e.g. Bachelor of Science"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="majorname">
                                        Major <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaChalkboardTeacher className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            id="majorname"
                                            name="majorname"
                                            value={formData.majorname}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            placeholder="e.g. Computer Science"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="yearofpassing">
                                        Year of Passing <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            id="yearofpassing"
                                            name="yearofpassing"
                                            value={formData.yearofpassing}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="YYYY"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="form-group">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="institutionname">
                                        Institution Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            id="institutionname"
                                            name="institutionname"
                                            value={formData.institutionname}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            placeholder="e.g. Harvard University"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="cgpa">
                                        CGPA <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="cgpa"
                                        name="cgpa"
                                        value={formData.cgpa}
                                        onChange={handleChange}
                                        min="0"
                                        max="10"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        placeholder="e.g. 3.75"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleCancel}
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
                                        Saving...
                                    </span>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" /> Save Education
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEducation;