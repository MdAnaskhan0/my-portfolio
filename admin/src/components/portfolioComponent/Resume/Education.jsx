import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Education = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const [education, setEducation] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchEducation()
    }, [])

    const fetchEducation = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/education`)
            setEducation(response.data.educationMode)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Education</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {education.map((edu) => (
                    <div key={edu._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">{edu.degreename}</h2>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Institution:</span> {edu.institutionname}</p>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Major:</span> {edu.majorname}</p>
                        <p className="text-gray-600 mb-1"><span className="font-medium">Year of Passing:</span> {edu.yearofpassing}</p>
                        {edu.cgpa && (
                            <p className="text-gray-600"><span className="font-medium">CGPA:</span> {edu.cgpa}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Education