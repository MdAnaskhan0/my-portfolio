import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiPhone, FiMail, FiCalendar, FiBriefcase, FiSave, FiTrash2, FiEdit, FiX, FiMapPin } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

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
        address: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                    address: res.data.user.address || '',
                });
                if (res.data.user.profilepicture) {
                    setProfilePicturePreview(res.data.user.profilepicture);
                }
                toast.success("Profile data loaded successfully");
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch profile data");
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

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size
        if (file.size > 1024 * 1024) { // 1MB
            toast.error('Image size should be less than 1MB');
            return;
        }

        try {
            // Compress image
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 450,
                useWebWorker: true
            };
            const compressedFile = await imageCompression(file, options);
            
            setProfilePicture(compressedFile);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result);
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            toast.error('Error compressing image');
            console.error(error);
        }
    };

    const removeImage = () => {
        setProfilePicture(null);
        setProfilePicturePreview(user.profilepicture || '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formDataToSend = new FormData();
            
            // Append all form data
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataToSend.append(key, value);
            });
            
            // Append profile picture if selected
            if (profilePicture) {
                formDataToSend.append('profilepicture', profilePicture);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this profile? This action cannot be undone.")) {
            try {
                await axios.delete(`${base_url}/api/user/${id}`);
                toast.success("Profile deleted successfully");
                navigate('/admin');
            } catch (err) {
                console.error(err);
                toast.error("Failed to delete profile");
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
                <p className="text-xl text-gray-600">Profile not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <ToastContainer position="top-center" autoClose={3000} />
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {editMode ? 'Edit Profile' : 'Profile Details'}
                        </h1>
                        <div className="flex space-x-3">
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                                >
                                    <FiEdit /> Edit
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setEditMode(false);
                                        setProfilePicture(null);
                                        setProfilePicturePreview(user.profilepicture || '');
                                    }}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                >
                                    <FiX /> Cancel
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
                            >
                                <FiTrash2 /> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {editMode ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative w-40 h-40 rounded-full border-2 border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 mb-4">
                                    {profilePicturePreview ? (
                                        <>
                                            <img 
                                                src={profilePicturePreview} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                            >
                                                <FiX size={12} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center p-4">
                                            <FaUserCircle className="mx-auto text-gray-400 text-4xl" />
                                        </div>
                                    )}
                                </div>
                                
                                <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2">
                                    <FiEdit /> Change Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-gray-500 text-center mt-1">Max 1MB, will be resized to 450×450px</p>
                            </div>

                            <div className="space-y-6 max-w-md mx-auto">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-6 py-2 rounded-lg font-medium text-white flex items-center gap-2 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <FiSave /> Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col justify-between p-8">
                            <div className="w-40 h-40 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-between mb-4">
                                {profilePicturePreview ? (
                                    <img 
                                        src={profilePicturePreview} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="text-gray-400 text-6xl" />
                                )}
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                            {user.designation && (
                                <p className="text-blue-600 font-medium mb-8">{user.designation}</p>
                            )}

                            <div className="w-full space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                                            <FiMail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium break-all">{user.email || 'Not specified'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                                            <FiPhone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{user.phone || 'Not specified'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                                            <FiCalendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Date of Birth</p>
                                            <p className="font-medium">
                                                {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                                            <FiMapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p className="font-medium">{user.address || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;