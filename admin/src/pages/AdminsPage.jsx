import { useState, useEffect } from 'react';
import adminApi from '../api/adminApi';
import { toast } from 'react-hot-toast';
import AdminList from '../components/AdminList';
import AdminForm from '../components/AdminForm';

const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { admin } = await adminApi.getAllAdmins();
      setAdmins(admin);
    } catch (error) {
      toast.error('Failed to fetch admins');
    }
  };

  const handleCreate = async (adminData) => {
    try {
      console.log('Sending:', adminData); // Log the payload
      await adminApi.createAdmin(adminData);
      toast.success('Admin created successfully');
      fetchAdmins();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response data:', error.response?.data);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to create admin'
      );
    }
  };

  const handleUpdate = async (id, adminData) => {
    try {
      await adminApi.updateAdmin(id, adminData);
      toast.success('Admin updated successfully');
      fetchAdmins();
      setEditingAdmin(null);
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to update admin');
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.deleteAdmin(id);
      toast.success('Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      toast.error('Failed to delete admin');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Admins</h1>
        <button
          onClick={() => {
            setEditingAdmin(null);
            setIsFormOpen(true);
          }}
          className="bg-primary text-gray-700 px-4 py-2 rounded hover:bg-primary-dark"
        >
          Add Admin
        </button>
      </div>

      <AdminList
        admins={admins}
        onEdit={(admin) => {
          setEditingAdmin(admin);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <AdminForm
          admin={editingAdmin}
          onSubmit={editingAdmin ? handleUpdate : handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setEditingAdmin(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminsPage;