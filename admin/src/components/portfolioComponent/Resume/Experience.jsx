import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiBriefcase, FiClock, FiMapPin } from 'react-icons/fi'
import { FaRegCircleDot } from "react-icons/fa6";
import { SiPaloaltonetworks } from "react-icons/si";

const Experience = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL
    const [experience, setExperience] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchExperience()
    }, [])

    const fetchExperience = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/experience`)
            setExperience(response.data.experience)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        if (dateString === 'Present') return 'Present';

        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

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
                    {experience.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No experience records found</p>
                    ) : (
                        experience.map((exp) => (
                            <div key={exp._id} className=''>
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <FaRegCircleDot className="text-yellow-500 text-xl" />
                                        <h3 className="text-base sm:text-lg font-medium text-gray-200">{exp.jobtitle}</h3>
                                    </div>
                                    <div className='pl-10 border-l-2 border-indigo-200 ml-2'>
                                        <p className="text-gray-300 text-sm mb-1">{exp.companyname}</p>

                                        <div className="flex items-center text-gray-500 text-sm mb-1">
                                            <FiBriefcase className="mr-2" size={14} />
                                            <span>{exp.department}</span>
                                        </div>

                                        <div className="flex items-center text-gray-500 text-sm">
                                            <FiClock className="mr-2" size={14} />
                                            <span>
                                                {formatDate(exp.startdate)} - {exp.enddate === 'Present' ? 'Present' : formatDate(exp.enddate)}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-gray-500 text-sm mb-1">
                                            <span className='w-full text-left sm:max-w-100 '>{exp.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default Experience