import React from 'react'
import './StudyAbroad.css'
import StudyAbroadBanner from '../../Components/StudyAbroadBanner/StudyAbroadBanner'
import LeverageEdu from '../../Components/LeverageEdu/LeverageEdu'
import LeverageEduAdvantage from '../../Components/LeverageEduAdvantage/LeverageEduAdvantage'
import TopUniversitiesStudyAbroad from '../../Components/TopUniversitiesStudyAbroad/TopUniversitiesStudyAbroad'
import SuccessStories from '../../Components/SuccessStories/SuccessStories'
import StudyAbroadInfoSection from '../../Components/StudyAbroadInfoSection/StudyAbroadInfoSection'

const StudyAbroad = () => {
  return (
    <div>
        <StudyAbroadBanner/>
        <LeverageEdu/>
        <LeverageEduAdvantage/>
        <TopUniversitiesStudyAbroad/>
        <SuccessStories/>
        <StudyAbroadInfoSection/>
    </div>
  )
}

export default StudyAbroad