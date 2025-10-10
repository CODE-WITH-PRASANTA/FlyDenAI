import React from 'react'
import './TouristVisa.css'
import TouristVisaSection from '../../Components/TouristVisaSection/TouristVisaSection'
import TouristVisaBanner from '../../Components/TouristVisaBanner/TouristVisaBanner'

const TouristVisa = () => {
  return (
    <div>
      <TouristVisaBanner />
      <TouristVisaSection/>
    </div>
  )
}

export default TouristVisa