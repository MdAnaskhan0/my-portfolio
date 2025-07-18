import React from 'react'
import Exparties from '../../components/portfolioComponent/Exparties';

const AboutMe = () => {
    return (
        <>
            <div className="overflow-hidden">
                <div className='px-4 py-2'>
                    <div className="md:flex text-white">
                        <p className='text-sm sm:text-lg text-gray-400 text-justify'>I am a Full Stack Developer with comprehensive expertise in HTML, CSS, JavaScript, React.js, and Tailwind CSS, along with a solid understanding of Express.js and MongoDB. This combination enables me to effectively create and manage reliable web applications across the entire development stack. I specialize in utilizing modern frameworks and technologies to deliver high-quality, industry-standard code that meets both user needs and business objectives. Driven by a strong passion for solving complex problems, I am committed to continuous learning and professional development.</p>
                    </div>

                    <div className="md:flex flex-col text-white mt-4">
                        <h3 className='text-white font-bold text-xl sm:text-3xl capitalize'>What i'm doing</h3>
                        <Exparties />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutMe