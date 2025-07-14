import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Experience = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  return (
    <>
        {/* 
            output 
        */}
    </>
  )
}

export default Experience