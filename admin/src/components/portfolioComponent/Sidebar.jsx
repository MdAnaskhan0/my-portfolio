import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram,
    FaEnvelope, FaPhone, FaMapMarker, FaUser, FaBriefcase,
    FaGraduationCap, FaCode, FaHome
} from 'react-icons/fa';
import { CgCalendarDates } from "react-icons/cg";
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { RiContactsBookFill } from 'react-icons/ri';

const Sidebar = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [userData, setUserData] = useState(null);
    const [socialLinks, setSocialLinks] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [userRes, socialRes] = await Promise.all([
                    axios.get(`${baseurl}/api/user`),
                    axios.get(`${baseurl}/api/socialmedia`)
                ]);
                setUserData(userRes.data.users[0]);
                setSocialLinks(socialRes.data.userSocialLinks);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load profile data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [baseurl]);

    const getSocialIcon = (name) => {
        const icons = {
            github: <FaGithub className="text-gray-500" />,
            linkedin: <FaLinkedin className="text-gray-500" />,
            facebook: <FaFacebook className="text-gray-500" />,
            twitter: <FaTwitter className="text-gray-500" />,
            instagram: <FaInstagram className="text-gray-500" />,
        };
        return icons[name.toLowerCase()] || null;
    };

    if (isLoading) {
        return (
            <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden h-full flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center p-6">
                    <div className="w-32 h-32 rounded-full bg-gray-800 mb-4"></div>
                    <div className="h-6 w-40 bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 w-32 bg-gray-800 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden h-full flex items-center justify-center p-4">
                <div className="text-red-500 text-center">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden h-full flex flex-col sm:ml-12 sm:py-8 border-1 border-gray-700">
            {/* Mobile menu button */}
            <div className="lg:hidden bg-gray-800 p-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">{userData?.name}</h3>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-yellow-500 focus:outline-none hover:text-yellow-400 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
                </button>
            </div>

            {/* Sidebar content */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block flex-1 flex flex-col`}>
                {/* Profile section */}
                {userData && (
                    <div className="p-6 text-center">
                        <div className="w-38 h-45 mx-auto mb-4 rounded-md bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-yellow-500">
                            {userData.profilepicture ? (
                                <img
                                    src={userData.profilepicture}
                                    alt={userData.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <span className="text-4xl text-yellow-500 font-bold">
                                    {userData.name.charAt(0)}
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-white">{userData.name}</h2>
                        <p className="text-gray-400 mt-1">{userData.designation || 'Professional'}</p>
                    </div>
                )}

                {/* Contact info */}
                {userData && (
                    <div className="p-4">
                        <ul className="space-y-3">
                            <li className="flex items-center px-2 py-1 text-gray-300">
                                <FaEnvelope className="text-[#E9C667] mr-3 bg-gray-800 p-2 rounded-md text-4xl flex-shrink-0" />
                                <Link to={`mailto:${userData.email}`} className="truncate hover:text-yellow-500 transition-colors">
                                    {userData.email}
                                </Link>
                            </li>
                            <li className="flex items-center px-2 py-1 text-gray-300">
                                <FaPhone className="text-[#E9C667] mr-3 bg-gray-800 p-2 rounded-md text-4xl flex-shrink-0" />
                                <Link to={`tel:${userData.phone}`} className="hover:text-yellow-500 transition-colors">
                                    {userData.phone}
                                </Link>
                            </li>
                            <li className="flex items-center px-2 py-1 text-gray-300">
                                <CgCalendarDates className="text-[#E9C667] mr-3 bg-gray-800 p-2 rounded-md text-4xl flex-shrink-0" />
                                <span>
                                    {new Date(userData.dob).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </li>
                            <li className="flex items-center px-2 py-1 text-gray-300">
                                <FaMapMarker className="text-[#E9C667] mr-3 bg-gray-800 p-2 rounded-md text-4xl flex-shrink-0" />
                                <span>{userData.address}</span>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Social links */}
                {socialLinks.length > 0 && (
                    <div className="p-4">
                        <div className="flex flex-wrap items-center justify-center gap-3 px-2">
                            {socialLinks.map((link) => (
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
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;