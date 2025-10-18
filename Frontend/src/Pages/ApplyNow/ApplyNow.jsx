import React from 'react'
import './ApplyNow.css'
import VisaApplicationForm from '../../Components/VisaApplicationForm/VisaApplicationForm'
import InternHero from '../../Components/InternHero/InternHero'
import ExploreSection from '../../Components/ExploreSection/ExploreSection'
import InternshipHighlights from '../../Components/InternshipHighlight/InternshipHighlight'
import CareerCarousel from '../../Components/CareerCarousel/CareerCarousel'
import AwardsShowcase from '../../Components/AwardsShowcase/AwardsShowcase'
import TestimonialSection from '../../Components/TestimonialSection/TestimonialSection'
import FeatureSection from '../../Components/FeatureSection/FeatureSection'
import MultiStepForm from '../../Components/MultiStepForm/MultiStepForm'


const ApplyNow = () => {
  return (
    <div>
      <VisaApplicationForm/>


      <InternHero/>
      <ExploreSection/>
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