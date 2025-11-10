import React from 'react'
import './AllCountry.css'
import AllCountryBanner from '../../Components/AllCountryBanner/AllCountryBanner'
import PopularDestinations from '../../Components/PopularDestinations/PopularDestinations'
import Team from '../../Components/Team/Team'
import WhyChooseUsSection from '../../Components/WhyChooseUsSection/WhyChooseUsSection'
import CustomerReviews from '../../Components/CustomerReviews/CustomerReviews'
import VisitUsSection from '../../Components/VisitUsSection/VisitUsSection'
import ApplyFlyden from '../../Components/ApplyFlyden/ApplyFlyden'

const AllCountry = () => {
  return (
    <div>
      <AllCountryBanner/>
      <PopularDestinations/>
      <ApplyFlyden/>
      <Team/>
      <WhyChooseUsSection/>
      <CustomerReviews/>
      {/* <VisitUsSection/> */}
    </div>
  )
}

export default AllCountry