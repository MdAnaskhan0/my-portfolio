import React from 'react';
import { useLocation } from 'react-router-dom';

const PathDisplay = () => {
    const location = useLocation();

    const getPathName = () => {
        switch (location.pathname) {
            case '/':
                return 'About Me';
            case '/resume':
                return 'Resume';
            case '/projects':
                return 'Projects';
            case '/contact':
                return 'Contact';
            default:
                return 'About Me';
        }
    };

    return (
        <div className="text-white font-bold text-md sm:text-3xl capitalize">
            {getPathName()}
        </div>
    );
};

export default PathDisplay;