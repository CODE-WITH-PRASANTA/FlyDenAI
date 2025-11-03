import React from 'react'
import './ContactPage.css'
import ContactSection from '../../Components/ContactSection/ContactSection'
import Branches from '../../Components/Branches/Branches'
import ContactSecBanner from '../../Components/ContactSecBanner/ContactSecBanner'

const ContactPage = () => {
  return (
    <div>
      <ContactSecBanner />
      <ContactSection/>
      {/* <Branches/> */}
    </div>
  )
}

export default ContactPage