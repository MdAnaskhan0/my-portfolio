import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLink2, FiEdit2, FiTrash2, FiSave, FiX, FiExternalLink, FiChevronLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SocialLinksManager = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [socialLink, setSocialLink] = useState({
    socialmedianame: '',
    socialmediaurl: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchSocialLink = async () => {
      try {
        const response = await axios.get(`${base_url}/api/socialmedia/${id}`);
        setSocialLink(response.data.userSocialLinks || {});
      } catch (error) {
        toast.error('Failed to load social link', {
          position: "top-center"
        });
        navigate('/admin/social');
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLink();
  }, [base_url, id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLink(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${base_url}/api/socialmedia/${id}`, socialLink);
      toast.success('Link updated successfully!', {
        position: "top-center",
        autoClose: 3000
      });
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating link', {
        position: "top-center"
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      setDeleting(true);
      try {
        await axios.delete(`${base_url}/api/socialmedia/${id}`);
        toast.success('Link deleted successfully!', {
          position: "top-center",
          autoClose: 3000
        });
        navigate('/admin/social');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting link', {
          position: "top-center"
        });
      } finally {
        setDeleting(false);
      }
    }
  };

  const getPlatformIcon = () => {
    const platform = socialLink.socialmedianame?.toLowerCase();
    const icons = {
      facebook: <FiLink2 className="text-blue-600" />,
      twitter: <FiLink2 className="text-blue-400" />,
      instagram: <FiLink2 className="text-pink-500" />,
      linkedin: <FiLink2 className="text-blue-700" />,
      youtube: <FiLink2 className="text-red-600" />,
      tiktok: <FiLink2 className="text-black" />,
      pinterest: <FiLink2 className="text-red-500" />,
      github: <FiLink2 className="text-gray-800" />,
    };
    return icons[platform] || <FiLink2 className="text-gray-500" />;
  };

  const socialMediaOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'pinterest', label: 'Pinterest' },
    { value: 'github', label: 'Github' },
    { value: 'other', label: 'Other' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <button
        onClick={() => navigate('/admin/social')}
        className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <FiChevronLeft className="mr-1" />
        Back to all links
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gray-100 rounded-xl">
                {getPlatformIcon()}
              </div>
              <h2 className="text-xl font-bold text-gray-800 capitalize">
                {socialLink.socialmedianame || 'Social Link'}
              </h2>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FiSave className="mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <FiX className="mr-1" />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FiEdit2 className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-70"
                  >
                    <FiTrash2 className="mr-1" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Platform</label>
            {isEditing ? (
              <select
                name="socialmedianame"
                value={socialLink.socialmedianame}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {socialMediaOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="px-4 py-3 bg-gray-50 rounded-lg capitalize">
                {socialLink.socialmedianame || 'Not specified'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Profile URL</label>
            {isEditing ? (
              <input
                type="url"
                name="socialmediaurl"
                value={socialLink.socialmediaurl}
                onChange={handleInputChange}
                placeholder="https://example.com/yourprofile"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : socialLink.socialmediaurl ? (
              <a
                href={socialLink.socialmediaurl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 text-blue-500 hover:underline break-all"
              >
                {socialLink.socialmediaurl}
                <FiExternalLink className="ml-2" />
              </a>
            ) : (
              <p className="px-4 py-3 text-gray-500 bg-gray-50 rounded-lg">
                No URL provided
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksManager;