import React from 'react'
import './Services.css'
import AboutAgency from '../../Components/AboutAgency/AboutAgency'
import VisaServices from '../../Components/VisaServices/VisaServices'
import ServiceTestimonials from '../../Components/ServiceTestimonials/ServiceTestimonials'
import FindAgents from '../../Components/FindAgents/FindAgents'
import ServiceBanner from '../../Components/ServiceBanner/ServiceBanner'
import ServiceLatestNews from '../../Components/ServiceLatestNews/ServiceLatestNews'
import ImmigrationServices from '../../Components/ImmigrationServices/ImmigrationServices'
import TeamSection from '../../Components/TeamSection/TeamSection'

const Services = () => {
  return (
    <div>
      <ServiceBanner/>
      <AboutAgency/>
      <VisaServices/>
      <ServiceTestimonials/>
      <FindAgents/>
      <ServiceLatestNews/>
      <ImmigrationServices/>
      <TeamSection/>
        
    </div>
  )
}

export default Services
