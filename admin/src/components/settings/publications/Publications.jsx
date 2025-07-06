import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaCalendarAlt, FaUser, FaBook, FaNewspaper } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Publications = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/publication`);
                setPublications(response.data.publication);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch publications');
                setLoading(false);
                toast.error('Failed to fetch publications', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        };
        fetchPublications();
    }, [baseurl]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this publication?')) {
            try {
                await axios.delete(`${baseurl}/api/publication/${id}`);
                setPublications(publications.filter(pub => pub._id !== id));
                toast.success('Publication deleted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch (err) {
                setError('Failed to delete publication');
                toast.error('Failed to delete publication', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    };

    if (loading) return (
        <div className="container mx-auto p-8 text-center text-gray-600">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            Loading publications...
        </div>
    );

    if (error) return (
        <div className="container mx-auto p-8 text-center text-red-500">
            {error}
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <ToastContainer />
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaBook className="mr-2" /> Publications
                    </h1>
                    <Link 
                        to="/admin/publication/create" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                    >
                        <FaPlus className="mr-2" /> Add New Publication
                    </Link>
                </div>
                
                {publications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No publications found. Create your first publication.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaUser className="inline mr-1" /> Author
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaCalendarAlt className="inline mr-1" /> Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaNewspaper className="inline mr-1" /> Publication
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {publications.map((pub) => (
                                    <tr key={pub._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{pub.title}</div>
                                            <div className="text-sm text-gray-500 line-clamp-2">{pub.description}</div>
                                            {pub.link && (
                                                <a 
                                                    href={pub.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1"
                                                >
                                                    <FaExternalLinkAlt className="mr-1" /> View
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {pub.authorname}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(pub.publishdate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {pub.publicationname}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/admin/publication/${pub._id}`}
                                                    className="text-blue-600 hover:text-blue-900 flex items-center"
                                                >
                                                    <FaEdit className="mr-1" /> Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(pub._id)}
                                                    className="text-red-600 hover:text-red-900 flex items-center"
                                                >
                                                    <FaTrash className="mr-1" /> Delete
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
    )
}

export default Publications;