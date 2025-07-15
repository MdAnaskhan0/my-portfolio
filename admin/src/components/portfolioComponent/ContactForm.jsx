import React from 'react'
import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'

const ContactForm = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            
            console.log('Form submitted:', formData)
            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            })

            const response = await axios.post(`${baseurl}/api/contact/create`, formData)
        } catch (error) {
            console.error('Error submitting form:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus(null), 5000)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Message sent successfully!
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    Error sending message. Please try again.
                </div>
            )}

            <div className='flex flex-row gap-4'>
                <div className="flex-1">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="flex-1">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="flex-1">
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                        placeholder="Enter your phone number"
                    />
                </div>
            </div>


            <div>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                    placeholder="Enter your message"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-50 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
            >
                {isSubmitting ? (
                    'Sending...'
                ) : (
                    <>
                        <FiSend className="mr-2" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    )
}

export default ContactForm