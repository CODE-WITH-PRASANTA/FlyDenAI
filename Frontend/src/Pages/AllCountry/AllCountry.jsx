import React from 'react'
import './AllCountry.css'
import AllCountryBanner from '../../Components/AllCountryBanner/AllCountryBanner'
import PopularDestinations from '../../Components/PopularDestinations/PopularDestinations'
import Team from '../../Components/Team/Team'
import ApplyingWithAkbar from '../../Components/ApplyingWithAkbar/ApplyingWithAkbar'
import WhyChooseUsSection from '../../Components/WhyChooseUsSection/WhyChooseUsSection'
import VisitUs from '../../Components/VisitUs/VisitUs'
import CustomerReviews from '../../Components/CustomerReviews/CustomerReviews'
import VisitUsSection from '../../Components/VisitUsSection/VisitUsSection'

const AllCountry = () => {
  return (
    <div>
      <AllCountryBanner/>
      <PopularDestinations/>
      <Team/>
      <ApplyingWithAkbar/>
      <WhyChooseUsSection/>
      <VisitUs/>
      <CustomerReviews/>
      <VisitUsSection/>
        
    </div>
  )
}

export default AllCountry