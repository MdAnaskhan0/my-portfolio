import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSkill = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [skill, setSkill] = useState({
        skillname: '',
        skilldescription: '',
        skilllevel: 'Beginner'
    });

    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSkill(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!skill.skillname.trim()) {
            toast.error('Skill name is required');
            return;
        }
        
        if (!skill.skilldescription.trim()) {
            toast.error('Skill description is required');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${baseurl}/api/skill/create`, skill);
            
            toast.success(response.data.message || 'Skill created successfully!');
            
            setSkill({
                skillname: '',
                skilldescription: '',
                skilllevel: 'Beginner'
            });
            
        } catch (error) {
            console.error('Error creating skill:', error);
            
            if (error.response) {
                // Server responded with error status
                toast.error(error.response.data.message || 'Failed to create skill');
            } else if (error.request) {
                // Request was made but no response
                toast.error('No response from server. Please try again.');
            } else {
                // Other errors
                toast.error('Error creating skill: ' + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Skill</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="skillname" className="block text-gray-700 text-sm font-medium mb-1">
                        Skill Name *
                    </label>
                    <input
                        type="text"
                        id="skillname"
                        name="skillname"
                        value={skill.skillname}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. JavaScript, Python"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skilldescription" className="block text-gray-700 text-sm font-medium mb-1">
                        Description *
                    </label>
                    <textarea
                        id="skilldescription"
                        name="skilldescription"
                        value={skill.skilldescription}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your skill level and experience"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="skilllevel" className="block text-gray-700 text-sm font-medium mb-1">
                        Skill Level
                    </label>
                    <select
                        id="skilllevel"
                        name="skilllevel"
                        value={skill.skilllevel}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {skillLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                >
                    {isLoading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <FaPlus className="mr-2" />
                            Create Skill
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateSkill;