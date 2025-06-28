import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBuilding, FaBriefcase, FaCalendarAlt, FaSave, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateExperience = () => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyname: '',
        jobtitle: '',
        department: '',
        startdate: '',
        enddate: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${base_url}/api/experience/create`, formData);
            toast.success('Experience created successfully!', {
                position: "top-center",
                autoClose: 3000,
            });
            setTimeout(() => {
                navigate('/experiences'); // Adjust this route as needed
            }, 1500);
        } catch (error) {
            console.error('Error creating experience:', error);
            const errorMessage = error.response?.data?.message || 'Error creating experience';
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 3000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Add New Experience</h2>
                        <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Company Name */}
                            <div className="sm:col-span-2">
                                <label htmlFor="companyname" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaBuilding className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="companyname"
                                        name="companyname"
                                        value={formData.companyname}
                                        onChange={handleChange}
                                        required
                                        className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. Google Inc."
                                    />
                                </div>
                            </div>

                            {/* Job Title */}
                            <div>
                                <label htmlFor="jobtitle" className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaBriefcase className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="jobtitle"
                                        name="jobtitle"
                                        value={formData.jobtitle}
                                        onChange={handleChange}
                                        required
                                        className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. Software Engineer"
                                    />
                                </div>
                            </div>

                            {/* Department */}
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    className="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g. Engineering"
                                />
                            </div>

                            {/* Start Date */}
                            <div>
                                <label htmlFor="startdate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        id="startdate"
                                        name="startdate"
                                        value={formData.startdate}
                                        onChange={handleChange}
                                        required
                                        className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* End Date */}
                            <div>
                                <label htmlFor="enddate" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        id="enddate"
                                        name="enddate"
                                        value={formData.enddate}
                                        onChange={handleChange}
                                        required
                                        className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="py-2 px-3 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe your responsibilities and achievements..."
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Saving...' : (
                                    <>
                                        <FaSave className="inline mr-2" />
                                        Save Experience
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

export default CreateExperience;