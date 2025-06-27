import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiPhone, FiMail, FiCalendar, FiBriefcase, FiSave, FiTrash2 } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const UpdateProfile = () => {
    const base_url = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        dob: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${base_url}/api/user/${id}`);
                setUser(res.data.user);
                setFormData({
                    name: res.data.user.name || '',
                    email: res.data.user.email || '',
                    phone: res.data.user.phone || '',
                    designation: res.data.user.designation || '',
                    dob: res.data.user.dob ? res.data.user.dob.split('T')[0] : '',
                });
                if (res.data.user.profilepicture) {
                    setProfilePicturePreview(res.data.user.profilepicture);
                }
                toast.success("User data loaded successfully");
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id, base_url]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            
            // Append all form data
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataToSend.append(key, value);
            });
            
            // Append profile picture if selected
            if (profilePicture) {
                formDataToSend.append('profilePicture', profilePicture);
            }

            const res = await axios.put(`${base_url}/api/user/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success("Profile updated successfully");
            setUser(res.data.updatedUser);
            setEditMode(false);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update profile");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await axios.delete(`${base_url}/api/user/${id}`);
                toast.success("User deleted successfully");
                navigate('/admin');
            } catch (err) {
                console.error(err);
                toast.error("Failed to delete user");
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

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600">User not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    {editMode ? 'Edit Profile' : 'User Profile'}
                </h1>
                <div className="flex space-x-3">
                    {!editMode && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                            <FiSave className="mr-2" /> Edit Profile
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                    >
                        <FiTrash2 className="mr-2" /> Delete User
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                {editMode ? (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 flex flex-col items-center">
                                <div className="relative mb-4">
                                    {profilePicturePreview ? (
                                        <img
                                            src={profilePicturePreview}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                            <FaUserCircle className="text-gray-400 text-5xl" />
                                        </div>
                                    )}
                                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(false);
                                    setProfilePicture(null);
                                    setProfilePicturePreview(user.profilepicture || '');
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                            >
                                <FiSave className="mr-2" /> Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center">
                            {profilePicturePreview ? (
                                <img
                                    src={profilePicturePreview}
                                    alt="Profile"
                                    className="w-48 h-48 rounded-full object-cover border-4 border-blue-100"
                                />
                            ) : (
                                <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
                                    <FaUserCircle className="text-gray-400 text-8xl" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FiUser className="text-blue-500 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium">{user.name || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FiMail className="text-blue-500 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{user.email || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FiPhone className="text-blue-500 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium">{user.phone || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FiBriefcase className="text-blue-500 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Designation</p>
                                    <p className="font-medium">{user.designation || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FiCalendar className="text-blue-500 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                    <p className="font-medium">
                                        {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not specified'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateProfile;