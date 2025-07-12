import React from 'react'

const Footer = () => {
    return (
        <>
            {/* Footer/copyright */}
            <div className="p-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} All Rights Reserved
            </div>
        </>
    )
}

export default Footer