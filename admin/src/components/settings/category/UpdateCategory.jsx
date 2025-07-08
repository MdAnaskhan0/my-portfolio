import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/projectcategory/${id}`);
                setCategoryName(response.data.projectCategory.projectcategoryname);
            } catch (error) {
                toast.error('Error fetching category details');
                navigate('/categories');
            } finally {
                setFetching(false);
            }
        };

        fetchCategory();
    }, [id, baseurl, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!categoryName.trim()) {
            toast.error('Category name is required');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.put(`${baseurl}/api/projectcategory/${id}`, {
                projectcategoryname: categoryName
            });
            toast.success(response.data.message);
            navigate('/admin/project-category');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating category');
        } finally {
            setIsLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Loading category details...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <button
                        onClick={() => navigate('/admin/project-category')}
                        className="mb-4 flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                    >
                        <FaArrowLeft className="mr-1" />
                        Back to Categories
                    </button>

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Update Project Category</h2>
                        <p className="mt-2 text-sm text-gray-600">Edit the category details</p>
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
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        Update Category
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

export default UpdateCategory;