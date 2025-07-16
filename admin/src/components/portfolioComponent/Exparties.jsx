import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCode, FiDatabase, FiCpu, FiSmartphone, FiLayout, FiLayers } from 'react-icons/fi';

const Exparties = () => {
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [exparties, setExparties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExparties();
    }, []);

    const fetchExparties = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/expart`);
            setExparties(response.data.expert);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // Assign icons based on expertise
    const getIcon = (expertiseName) => {
        const name = expertiseName.toLowerCase();
        if (name.includes('frontend') || name.includes('react')) return <FiCode />;
        if (name.includes('backend') || name.includes('node')) return <FiCpu />;
        if (name.includes('database') || name.includes('mongo')) return <FiDatabase />;
        if (name.includes('mobile') || name.includes('app')) return <FiSmartphone />;
        if (name.includes('ui') || name.includes('design')) return <FiLayout />;
        return <FiLayers />;
    };

    return (
        <div className="py-8">
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl animate-pulse">
                            <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-700 rounded w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exparties.map((exparty) => (
                        <div
                            key={exparty._id}
                            className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-yellow-500/30 flex items-start gap-4"
                        >
                            <div className="p-3 bg-gray-700 rounded-full text-yellow-500 text-xl flex-shrink-0">
                                {getIcon(exparty.expartitemname)}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-white font-medium text-lg mb-1">
                                    {exparty.expartitemname}
                                </h3>
                                <p className="text-gray-400 text-sm text-left">
                                    {exparty.expartitemdescription}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Exparties;