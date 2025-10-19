import React from 'react'
import './ApplyNow.css'
import VisaApplicationForm from '../../Components/VisaApplicationForm/VisaApplicationForm'
import ApplyNowBanner from '../../Components/ApplyNowBanner/ApplyNowBanner'
import InternHero from '../../Components/InternHero/InternHero'
import InternshipHighlights from '../../Components/InternshipHighlight/InternshipHighlight'
import CareerCarousel from '../../Components/CareerCarousel/CareerCarousel'
import AwardsShowcase from '../../Components/AwardsShowcase/AwardsShowcase'
import TestimonialSection from '../../Components/TestimonialSection/TestimonialSection'
import FeatureSection from '../../Components/FeatureSection/FeatureSection'
import MultiStepForm from '../../Components/MultiStepForm/MultiStepForm'
import ExploreSection from '../../Components/ExploreSection/ExploreSection'


const ApplyNow = () => {
  return (
    <div>
      <ApplyNowBanner />
      <VisaApplicationForm/>
      <InternHero/>
      <ExploreSection />
      <InternshipHighlights/>
      <CareerCarousel/>
      <AwardsShowcase/>
      <TestimonialSection/>
      <FeatureSection/>
      <MultiStepForm/>
    </div>
  )
}

export default ApplyNow