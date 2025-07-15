import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  FiCode, 
  FiDatabase, 
  FiCpu,
  FiLayers,
  FiServer,
  FiSmartphone,
  FiCloud,
  FiMonitor
} from 'react-icons/fi'
import { 
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt
} from 'react-icons/fa'
import { 
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiGraphql,
  SiFirebase
} from 'react-icons/si'

const Skill = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/skill`)
            setSkills(response.data.skill)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getSkillIcon = (skillname) => {
        const iconMap = {
            'react': <FaReact className="text-indigo-600" size={24} />,
            'node': <FaNodeJs className="text-green-600" size={24} />,
            'python': <FaPython className="text-blue-600" size={24} />,
            'java': <FaJava className="text-red-600" size={24} />,
            'html': <FaHtml5 className="text-orange-600" size={24} />,
            'css': <FaCss3Alt className="text-blue-500" size={24} />,
            'javascript': <FaJs className="text-yellow-500" size={24} />,
            'typescript': <SiTypescript className="text-blue-600" size={24} />,
            'mongodb': <SiMongodb className="text-green-500" size={24} />,
            'express': <SiExpress className="text-gray-800" size={24} />,
            'tailwind': <SiTailwindcss className="text-cyan-500" size={24} />,
            'redux': <SiRedux className="text-purple-500" size={24} />,
            'docker': <SiDocker className="text-blue-400" size={24} />,
            'git': <FaGitAlt className="text-orange-600" size={24} />,
            'graphql': <SiGraphql className="text-pink-600" size={24} />,
            'firebase': <SiFirebase className="text-yellow-500" size={24} />,
            'frontend': <FiCode className="text-indigo-500" size={24} />,
            'backend': <FiServer className="text-gray-600" size={24} />,
            'mobile': <FiSmartphone className="text-purple-500" size={24} />,
            'cloud': <FiCloud className="text-blue-400" size={24} />,
            'fullstack': <FiLayers className="text-green-500" size={24} />,
            'devops': <FiCpu className="text-red-500" size={24} />,
            'ui/ux': <FiMonitor className="text-pink-500" size={24} />
        }

        const lowerName = skillname.toLowerCase()
        for (const [key, icon] of Object.entries(iconMap)) {
            if (lowerName.includes(key)) {
                return icon
            }
        }
        return <FiCode className="text-gray-500" size={24} />
    }

    const getSkillProgress = (level) => {
        const progressMap = {
            'beginner': 30,
            'intermediate': 60,
            'advanced': 85,
            'expert': 100
        }
        return progressMap[level.toLowerCase()] || 50
    }

    const getProgressColor = (level) => {
        const colors = {
            'beginner': 'text-green-500',
            'intermediate': 'text-blue-500',
            'advanced': 'text-purple-500',
            'expert': 'text-yellow-500'
        }
        return colors[level.toLowerCase()] || 'text-gray-500'
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                {skills.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-400">No skills found</p>
                    </div>
                ) : (
                    skills.map((skill) => {
                        const progress = getSkillProgress(skill.skilllevel)
                        const progressColor = getProgressColor(skill.skilllevel)
                        
                        return (
                            <div 
                                key={skill._id} 
                                className="flex flex-col items-center"
                            >
                                {/* Circular progress with icon */}
                                <div className="relative w-20 h-20 mb-4">
                                    <svg className="w-full h-full" viewBox="0 0 36 36">
                                        {/* Background circle */}
                                        <path
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#e6e6e6"
                                            strokeWidth="2"
                                        />
                                        {/* Progress circle */}
                                        <path
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            className={progressColor}
                                            strokeWidth="2"
                                            strokeDasharray={`${progress}, 100`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {getSkillIcon(skill.skillname)}
                                    </div>
                                </div>
                                
                                {/* Skill info */}
                                <div className="text-center">
                                    <h3 className="text-md font-medium text-gray-100 mb-1">
                                        {skill.skillname}
                                    </h3>
                                    {skill.skilldescription && (
                                        <p className="text-gray-500 text-xs">
                                            {/* {skill.skilldescription} */}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Skill