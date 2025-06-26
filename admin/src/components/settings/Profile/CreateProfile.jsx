import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUpload } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProfile = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    dob: '',
    address: '',
    profilepicture: null, // lowercase here
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilepicture: e.target.files[0] }); // lowercase here too
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      await axios.post(`${base_url}/api/user/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile created successfully!');
      setTimeout(() => navigate('/admin'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating profile');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUserPlus /> Create Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Profile Picture</label>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer bg-gray-200 p-2 rounded flex items-center gap-1">
                <FaUpload /> Upload
                <input
                  type="file"
                  name="profilepicture"  // lowercase here
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {formData.profilepicture && (
                <span className="text-sm">{formData.profilepicture.name}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
