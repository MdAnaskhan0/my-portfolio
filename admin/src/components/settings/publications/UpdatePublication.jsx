import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePublication = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        authorname: '',
        publishdate: '',
        publicationname: '',
        link: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/publication/${id}`);
                const pub = response.data.publication;
                setFormData({
                    title: pub.title,
                    authorname: pub.authorname,
                    publishdate: pub.publishdate.split('T')[0],
                    publicationname: pub.publicationname,
                    link: pub.link || '',
                    description: pub.description
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch publication data');
                setLoading(false);
            }
        };
        fetchPublication();
    }, [baseurl, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseurl}/api/publication/${id}`, formData);
            if (response.status === 200) {
                navigate('/admin/publication');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating publication');
        }
    };

    if (loading) return <div className="container mx-auto p-4">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Publication</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Author Name</label>
                    <input 
                        type="text" 
                        name="authorname" 
                        value={formData.authorname} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Publish Date</label>
                    <input 
                        type="date" 
                        name="publishdate" 
                        value={formData.publishdate} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Publication Name</label>
                    <input 
                        type="text" 
                        name="publicationname" 
                        value={formData.publicationname} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Link (optional)</label>
                    <input 
                        type="url" 
                        name="link" 
                        value={formData.link} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                        placeholder="https://example.com"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Update Publication
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/admin/publication')} 
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePublication