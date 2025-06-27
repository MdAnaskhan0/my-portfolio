import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiPhone, FiMail, FiCalendar, FiBriefcase, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { FaUserTie, FaRegUserCircle, FaSearch } from 'react-icons/fa';

const User = () => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${base_url}/api/user/`);
                const userData = res.data.users || [];
                setUsers(userData);
                setFilteredUsers(userData);
                toast.success('Profiles loaded successfully!');
            } catch (err) {
                console.log(err);
                toast.error('Failed to load profiles');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [base_url]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => 
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.designation?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    const handleImageError = (e) => {
        e.target.src = '';
        e.target.onerror = null;
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            try {
                await axios.delete(`${base_url}/api/user/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
                toast.success('Profile deleted successfully');
            } catch (err) {
                console.log(err);
                toast.error('Failed to delete profile');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-center" autoClose={3000} />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <FaUserTie className="text-blue-500" /> Profile Management
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-grow max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search profiles..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <button
                        onClick={() => navigate('/admin/create-profile')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                        <FiPlus /> New Profile
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {filteredUsers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profile
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {user.profilepicture ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={user.profilepicture}
                                                            alt="Profile"
                                                            onError={handleImageError}
                                                        />
                                                    ) : (
                                                        <FaRegUserCircle className="h-10 w-10 text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    {user.designation && (
                                                        <div className="text-sm text-gray-500 flex items-center">
                                                            <FiBriefcase className="mr-1" size={14} />
                                                            {user.designation}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center">
                                                <FiMail className="mr-2 text-blue-500" size={14} />
                                                {user.email || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center mt-1">
                                                <FiPhone className="mr-2 text-blue-500" size={14} />
                                                {user.phone || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <FiCalendar className="mr-2 text-blue-500" size={14} />
                                                {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end items-center space-x-3">
                                                <button
                                                    onClick={() => navigate(`/admin/profile/${user._id}`)}
                                                    className="text-blue-600 hover:text-blue-900 flex items-center gap-1 p-1 rounded hover:bg-blue-50 transition-colors"
                                                    title="View/Edit"
                                                >
                                                    <FiEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-red-600 hover:text-red-900 flex items-center gap-1 p-1 rounded hover:bg-red-50 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={16} />
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
                        <FiUser className="mx-auto text-4xl text-gray-400 mb-3" />
                        <p className="text-lg text-gray-600">No profiles found</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {searchTerm ? 'Try a different search term' : 'Create a new profile to get started'}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => navigate('/admin/create-profile')}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto transition-colors"
                            >
                                <FiPlus /> Create Profile
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;