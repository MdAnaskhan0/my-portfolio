import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiUser, FiPhone, FiMail, FiCalendar, FiBriefcase } from 'react-icons/fi';
import { FaUserTie, FaRegUserCircle } from 'react-icons/fa';

const User = () => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${base_url}/api/user/`);
                setUsers(res.data.users || []);
                toast.success('Users loaded successfully!');
            } catch (err) {
                console.log(err);
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [base_url]);

    const handleImageError = (e) => {
        e.target.style.display = 'none';
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
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaUserTie className="mr-2" /> User Management
            </h1>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Details
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
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
                                        <button
                                            onClick={() => navigate(`/admin/profile/${user._id}`)}
                                            className="text-blue-600 hover:text-blue-900 flex items-center"
                                        >
                                            <FiEdit className="mr-1" /> view
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {users.length === 0 && !loading && (
                <div className="text-center py-12 border border-gray-200 rounded-lg mt-4">
                    <FiUser className="mx-auto text-4xl text-gray-400 mb-3" />
                    <p className="text-lg text-gray-600">No users found</p>
                    <p className="text-sm text-gray-500 mt-1">Try adding some users to get started</p>
                </div>
            )}
        </div>
    );
};

export default User;