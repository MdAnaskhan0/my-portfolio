import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiLink2, FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocialLinks = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await axios.get(`${base_url}/api/socialmedia`);
        setSocialLinks(res.data.userSocialLinks || []);
      } catch (error) {
        toast.error("Error fetching social links", {
          position: "top-center"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, [base_url]);

  const getPlatformIcon = (platform) => {
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
    return icons[platform.toLowerCase()] || <FiLink2 className="text-gray-500" />;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await axios.delete(`${base_url}/api/socialmedia/${id}`);
        setSocialLinks(prev => prev.filter(link => link._id !== id));
        toast.success('Link deleted successfully', {
          position: "top-center"
        });
      } catch (error) {
        toast.error('Error deleting link', {
          position: "top-center"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Social Links</h2>
          <p className="text-gray-500">Manage your connected social media profiles</p>
        </div>
        <button
          onClick={() => navigate('/admin/social/create')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiPlus className="mr-2" />
          Add New
        </button>
      </div>

      {socialLinks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FiLink2 className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No social links added yet</h3>
          <p className="text-gray-500 mt-2">Add your first social media profile to get started</p>
          <button
            onClick={() => navigate('/admin/social/create')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Social Link
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {socialLinks.map((link) => (
              <li key={link._id} className="hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getPlatformIcon(link.socialmedianame)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 capitalize">{link.socialmedianame}</p>
                      <a
                        href={link.socialmediaurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline flex items-center"
                      >
                        {link.socialmediaurl.substring(0, 30)}...
                        <FiExternalLink className="ml-1" size={14} />
                      </a>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/admin/social/${link._id}`)}
                      className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(link._id)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/social/${link._id}`)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;