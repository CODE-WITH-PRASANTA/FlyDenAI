import React from 'react'
import './BlogSec.css'
import ImmigrationPage from '../../Components/ImmigrationPage/ImmigrationPage'
import AboutCompany from '../../Components/AboutCompany/AboutCompany'
import ServiceWeProvide from '../../Components/ServiceWeProvide/ServiceWeProvide'
import TrustedBrands from '../../Components/TrustedBrands/TrustedBrands'
import CountriesWeOffer from '../../Components/CountriesWeOffer/CountriesWeOffer'
import IconsSections from '../../Components/IconsSections/IconsSections'
import BlogTeamMembers from '../../Components/BlogTeamMembers/BlogTeamMembers'
import ConsultancyReasons from '../../Components/ConsultancyReasons/ConsultancyReasons'
import FourIcons from '../../Components/FourIcons/FourIcons'
import OurTestimonials from '../../Components/OurTestimonials/OurTestimonials'
import NewsBlog from '../../Components/NewsBlog/NewsBlog'
import WorkingProcess from '../../Components/WorkingProcess/WorkingProcess'
import ContactForm from '../../Components/ContactForm/ContactForm'

const BlogSec = () => {
  return (
    <div>
      <ImmigrationPage/>
      <AboutCompany/>
      <ServiceWeProvide/>
      <TrustedBrands/>
      <CountriesWeOffer/>
      <IconsSections/>
      <BlogTeamMembers/>
      <ConsultancyReasons/>
      <FourIcons/>
      <OurTestimonials/>
      <WorkingProcess/>
      <ContactForm/>
      <NewsBlog/>
        
    </div>
  )
}

export default BlogSec