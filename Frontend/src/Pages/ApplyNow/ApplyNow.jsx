import React from 'react'
import './ApplyNow.css'
import VisaApplicationForm from '../../Components/VisaApplicationForm/VisaApplicationForm'
import ApplyNowBanner from '../../Components/ApplyNowBanner/ApplyNowBanner'


const ApplyNow = () => {
  return (
    <div>
      <ApplyNowBanner />
      <VisaApplicationForm/>
    </div>
  )
}

export default ApplyNow