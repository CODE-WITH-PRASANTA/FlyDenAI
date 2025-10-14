import React from 'react'
import './FreeVisaQuotes.css'
import TrainingSection from '../../Components/TrainingSection/TrainingSection'
import TopSection from '../../Components/TopSection/TopSection'
import AboutSection from '../../Components/AboutSection/AboutSection'
import VisaServiceSection from '../../Components/VisaServiceSection/VisaServiceSection'
import ImmigrationOverview from '../../Components/ImmigrationOverview/ImmigrationOverview'
import ChooseUsSection from '../../Components/ChooseUsSection/ChooseUsSection'
import FaqSection from '../../Components/FaqSection/FaqSection'
import VisaStepsSection from '../../Components/VisaStepsSection/VisaStepsSection'
import GetInTouch from '../../Components/GetInTouch/GetInTouch'
import FreeVisaQuotesBanner from '../../Components/FreeVisaQuotesBanner/FreeVisaQuotesBanner'


const FreeVisaQuotes = () => {
  return (
    <div>
      <FreeVisaQuotesBanner/>
      <TrainingSection/>
      <TopSection/>
      <AboutSection/>
      <ImmigrationOverview/>
      <VisaStepsSection/>
      <VisaServiceSection/>
      <ChooseUsSection/>
      <FaqSection/>
      <GetInTouch/>
    </div>
  )
}

export default FreeVisaQuotes