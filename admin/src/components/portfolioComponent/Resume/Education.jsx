import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiBookmark, FiCalendar, FiAward } from 'react-icons/fi'
import { FaRegCircleDot } from "react-icons/fa6";

const Education = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL
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
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    return (
        <>
            <div className='pl-3'>
                <div className="space-y-4">
                    {education.map((edu) => (
                        <div key={edu._id} className=''>
                            <div className=''>
                                <div className='flex items-center gap-4'>
                                    <FaRegCircleDot className="text-yellow-500 text-xl" />
                                    <h3 className="text-lg font-medium text-gray-200">{edu.degreename}</h3>
                                </div>
                                <div className='pl-10 border-l-2 border-indigo-200 ml-2'>
                                    <p className="text-gray-600 text-sm mb-1">{edu.institutionname}</p>

                                    <div className="flex items-center text-gray-500 text-sm mb-1">
                                        <FiBookmark className="mr-2" size={14} />
                                        <span>{edu.majorname}</span>
                                    </div>

                                    <div className="flex items-center text-gray-500 text-sm">
                                        <FiCalendar className="mr-2" size={14} />
                                        <span>{edu.yearofpassing}</span>
                                        {edu.cgpa && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <FiAward className="mr-2" size={14} />
                                                <span>CGPA: {edu.cgpa}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Education