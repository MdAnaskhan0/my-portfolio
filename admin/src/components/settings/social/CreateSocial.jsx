import React, { useState } from 'react';
import axios from 'axios';
import { FiLink2, FiPlus, FiX, FiCheck } from 'react-icons/fi';

const CreateSocial = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    socialmedianame: '',
    socialmediaurl: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
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
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${base_url}/api/socialmedia/create`, formData);
      setMessage(response.data.message);
      setFormData({
        socialmedianame: '',
        socialmediaurl: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating social media link');
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <FiLink2 className="text-blue-500 text-2xl mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Add Social Media Link</h1>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
          <FiCheck className="mr-2" />
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <FiX className="mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="socialmedianame" className="block text-sm font-medium text-gray-700 mb-1">
            Platform
          </label>
          <select
            id="socialmedianame"
            name="socialmedianame"
            value={formData.socialmedianame}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a platform</option>
            {socialMediaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="socialmediaurl" className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FiLink2 className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            'Creating...'
          ) : (
            <>
              <FiPlus className="mr-2" />
              Add Social Link
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSocial;