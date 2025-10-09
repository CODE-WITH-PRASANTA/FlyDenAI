import React from 'react'
import './AllVisaOverView.css'
import VisaOverviewBanner from '../../Components/VisaOverviewBanner/VisaOverviewBanner'
import VisaOffer from '../../Components/VisaOffer/VisaOffer'
import AllVisaAvalable from '../../Components/AllVisaAvalable/AllVisaAvalable'
import CompanyReport from '../../Components/CompanyReport/CompanyReport'
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs'

const AllVisaOverView = () => {
  return (
    <div>
        <VisaOverviewBanner />
        <VisaOffer />
        <AllVisaAvalable />
        <CompanyReport />
        <WhyChooseUs />
    </div>
  )
}

export default AllVisaOverView