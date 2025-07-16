import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'
import ContactForm from '../../components/portfolioComponent/ContactForm'
import {FaInstagram, FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'

const Contact = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const socialLinksResponse = await axios.get(`${baseurl}/api/socialmedia`)
      setSocialLinks(socialLinksResponse.data.userSocialLinks)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] bg-gray-800">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-700 h-12 w-12"></div>
        </div>
      </div>
    )
  }

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'instagram': return <FaInstagram className="text-gray-500" />;
      case 'github': return <FaGithub className="text-gray-500" />;
      case 'linkedin': return <FaLinkedin className="text-gray-500" />;
      case 'twitter': return <FaTwitter className="text-gray-500" />;
      case 'facebook': return <FaFacebook className="text-gray-500" />;
      default: return <span className="text-gray-500">🔗</span>;
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 text-white">
      <div className='flex flex-row gap-4 justify-start sm:justify-end'>
        {
          socialLinks.map((link) => (
            <Link
              key={link._id}
              to={link.socialmediaurl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center  hover:text-gray-900 transition-colors transform hover:scale-110"
              title={link.socialmedianame}
              aria-label={link.socialmedianame}
            >
              {getSocialIcon(link.socialmedianame)}
            </Link>
          ))
        }
      </div>
      <div className="max-w-3xl mx-auto my-10 sm:my-20">
        {/* Contact Form */}
        <div className="bg-gray-900">
          <ContactForm />
        </div>


      </div>
    </div>
  )
}

export default Contact