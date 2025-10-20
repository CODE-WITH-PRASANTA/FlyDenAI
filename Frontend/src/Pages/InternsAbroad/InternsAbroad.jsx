import React from 'react'
import './InternsAbroad.css'
import InternHero from '../../Components/InternHero/InternHero'
import InternshipHighlights from '../../Components/InternshipHighlight/InternshipHighlight'
import CareerCarousel from '../../Components/CareerCarousel/CareerCarousel'
import AwardsShowcase from '../../Components/AwardsShowcase/AwardsShowcase'
import TestimonialSection from '../../Components/TestimonialSection/TestimonialSection'
import FeatureSection from '../../Components/FeatureSection/FeatureSection'
 
const InternsAbroad = () => {
  return (
    <div>
      <InternHero/>
      <InternshipHighlights/>
      <CareerCarousel/>
      <AwardsShowcase/>
      <TestimonialSection/>
      <FeatureSection/>
    </div>
  )
}

export default InternsAbroad