import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/api/admin`;

const createAdmin = async (adminData) => {
  try {
    console.log('Sending data:', adminData); // Log the data being sent
    const response = await axios.post(`${API_URL}/create`, adminData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response:', response);
    console.log('Full API URL:', `${BASE_URL}/api/admin/create`);
    return response.data;
  } catch (error) {
    console.error('Error creating admin:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};


const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('adminToken', response.data.token);
  }
  return response.data;
};

const logoutAdmin = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.post(`${API_URL}/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem('adminToken');
  return response.data;
};

const getAdminProfile = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.post(`${API_URL}/profile`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getAllAdmins = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getAdminById = async (id) => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateAdmin = async (id, adminData) => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.put(`${API_URL}/${id}`, adminData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteAdmin = async (id) => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};