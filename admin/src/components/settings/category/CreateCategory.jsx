import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!categoryName.trim()) {
            toast.error('Category name is required');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${baseurl}/api/projectcategory/create`, {
                projectcategoryname: categoryName
            });
            toast.success(response.data.message);
            setCategoryName('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating category');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Create New Project Category</h2>
                        <p className="mt-2 text-sm text-gray-600">Add a new category to organize your projects</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter category name"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <FaPlus className="mr-2" />
                                        Create Category
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

export default CreateCategory;