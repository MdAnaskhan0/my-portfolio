import React from 'react'
import Education from '../../components/portfolioComponent/Resume/Education'
import Experience from '../../components/portfolioComponent/Resume/Experience'
import Skill from '../../components/portfolioComponent/Resume/Skill'

const Resume = () => {
  return (
    <>
      <div>
          <Education />
          <Experience />
          <Skill />
      </div>
    </>
  )
}

export default Resume