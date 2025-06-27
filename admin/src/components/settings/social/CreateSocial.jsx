import React, { useState } from 'react';
import axios from 'axios';
import { FiLink2, FiPlus, FiX, FiCheck, FiChevronDown } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSocial = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    socialmedianame: '',
    socialmediaurl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${base_url}/api/socialmedia/create`, formData);
      toast.success(response.data.message || 'Social link created successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        socialmedianame: '',
        socialmediaurl: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating social media link', {
        position: "top-center"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialMediaOptions = [
    { value: 'facebook', label: 'Facebook', icon: 'facebook' },
    { value: 'twitter', label: 'Twitter', icon: 'twitter' },
    { value: 'instagram', label: 'Instagram', icon: 'instagram' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
    { value: 'youtube', label: 'YouTube', icon: 'youtube' },
    { value: 'tiktok', label: 'TikTok', icon: 'music' },
    { value: 'pinterest', label: 'Pinterest', icon: 'pinterest' },
    { value: 'github', label: 'Github', icon: 'github' },
    { value: 'other', label: 'Other', icon: 'link' },
  ];

  const getIcon = (iconName) => {
    const icons = {
      facebook: <FiLink2 className="text-blue-600" />,
      twitter: <FiLink2 className="text-blue-400" />,
      instagram: <FiLink2 className="text-pink-500" />,
      linkedin: <FiLink2 className="text-blue-700" />,
      youtube: <FiLink2 className="text-red-600" />,
      music: <FiLink2 className="text-black" />,
      pinterest: <FiLink2 className="text-red-500" />,
      github: <FiLink2 className="text-gray-800" />,
      link: <FiLink2 className="text-gray-500" />,
    };
    return icons[iconName] || <FiLink2 />;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full mr-4">
          <FiLink2 className="text-blue-600 text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Social Media Link</h1>
          <p className="text-gray-500">Connect your social media profiles</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="socialmedianame" className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          <div className="relative">
            <select
              id="socialmedianame"
              name="socialmedianame"
              value={formData.socialmedianame}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pl-12 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="">Select a platform</option>
              {socialMediaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              {formData.socialmedianame ? 
                getIcon(socialMediaOptions.find(o => o.value === formData.socialmedianame)?.icon || 'link') : 
                <FiLink2 />}
            </div>
            <FiChevronDown className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="socialmediaurl" className="block text-sm font-medium text-gray-700">
            Profile URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="socialmediaurl"
              name="socialmediaurl"
              value={formData.socialmediaurl}
              onChange={handleChange}
              required
              placeholder="https://example.com/yourprofile"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FiLink2 />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <FiPlus className="mr-2" />
          )}
          {isSubmitting ? 'Creating...' : 'Add Social Link'}
        </button>
      </form>
    </div>
  );
};

export default CreateSocial;