import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUserEdit, FaCalendarAlt, FaNewspaper, FaLink, FaAlignLeft, FaSave } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePublication = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        authorname: '',
        publishdate: '',
        publicationname: '',
        link: '',
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
            const response = await axios.post(`${baseurl}/api/publication/create`, formData);
            if (response.status === 201) {
                toast.success('Publication created successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    navigate('/admin/publication');
                }, 1500);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating publication', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <ToastContainer />
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaBook className="mr-2" /> Create New Publication
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FaBook className="mr-2" /> Title *
                            </label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter publication title"
                                required
                            />
                        </div>
                        
                        {/* Author Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FaUserEdit className="mr-2" /> Author Name *
                            </label>
                            <input 
                                type="text" 
                                name="authorname" 
                                value={formData.authorname} 
                                onChange={handleChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter author name"
                                required
                            />
                        </div>
                        
                        {/* Publish Date Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FaCalendarAlt className="mr-2" /> Publish Date *
                            </label>
                            <input 
                                type="date" 
                                name="publishdate" 
                                value={formData.publishdate} 
                                onChange={handleChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        
                        {/* Publication Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FaNewspaper className="mr-2" /> Publication Name *
                            </label>
                            <input 
                                type="text" 
                                name="publicationname" 
                                value={formData.publicationname} 
                                onChange={handleChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter publication name"
                                required
                            />
                        </div>
                        
                        {/* Link Field */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FaLink className="mr-2" /> Link (optional)
                            </label>
                            <input 
                                type="url" 
                                name="link" 
                                value={formData.link} 
                                onChange={handleChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>
                    
                    {/* Description Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                            <FaAlignLeft className="mr-2" /> Description *
                        </label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="5"
                            placeholder="Enter detailed description of the publication"
                            required
                        />
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors duration-200"
                            disabled={isSubmitting}
                        >
                            <FaSave className="mr-2" />
                            {isSubmitting ? 'Creating...' : 'Create Publication'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePublication;