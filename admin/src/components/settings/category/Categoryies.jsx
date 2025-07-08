import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch, FaSync, FaSpinner} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Categories = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseurl}/api/projectcategory/`);
            setCategories(response.data.projectCategory);
        } catch (error) {
            toast.error('Error fetching categories');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setDeletingId(id);
            try {
                await axios.delete(`${baseurl}/api/projectcategory/${id}`);
                toast.success('Category deleted successfully');
                fetchCategories();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting category');
            } finally {
                setDeletingId(null);
            }
        }
    };

    const filteredCategories = categories.filter(category =>
        category.projectcategoryname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Project Categories</h1>
                        <p className="mt-1 text-sm text-gray-600">Manage all your project categories</p>
                    </div>
                    <Link
                        to="/admin/project-category/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add New Category
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            onClick={fetchCategories}
                            disabled={loading}
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                        >
                            <FaSync className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="inline-flex items-center">
                                <FaSpinner className="animate-spin mr-2" />
                                Loading categories...
                            </div>
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            {searchTerm ? 'No matching categories found' : 'No categories available'}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCategories.map((category) => (
                                        <tr key={category._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{category.projectcategoryname}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        to={`/admin/update-category/${category._id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <FaEdit className="inline mr-1" />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(category._id)}
                                                        disabled={deletingId === category._id}
                                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                    >
                                                        {deletingId === category._id ? (
                                                            <FaSpinner className="animate-spin inline mr-1" />
                                                        ) : (
                                                            <FaTrash className="inline mr-1" />
                                                        )}
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;