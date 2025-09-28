import React from 'react'
import './AboutUs.css'
import AboutUsBanner from '../../Components/AboutUsBanner/AboutUsBanner'
import ImmigrationSection from '../../Components/ImmigrationSection/ImmigrationSection'
import VisaSteps from '../../Components/VisaSteps/VisaSteps'
import Milestones from '../../Components/Milestones/Milestones'
import Blog from '../../Components/Blog/Blog'

const AboutUs = () => {
  return (
    <div>
      <AboutUsBanner/>
      <ImmigrationSection/>
      <VisaSteps/>
      <Milestones/>
      <Blog/>
    </div>
  )
}

export default AboutUs