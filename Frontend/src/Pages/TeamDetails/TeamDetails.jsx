import React from 'react'
import './TeamDetails.css'
import DirectorProfile from '../../Components/DirectorProfile/DirectorProfile'
import ImpactSection from '../../Components/ImpactSection/ImpactSection'
import HonorsAwards from '../../Components/HonorsAwards/HonorsAwards'
import TeamDetailsBanner from '../../Components/TeamDetailsBanner/TeamDetailsBanner'

const TeamDetails = () => {
  return (
    <div>
      <TeamDetailsBanner/>
      <DirectorProfile/>
      <ImpactSection/>
      <HonorsAwards/>
        
    </div>
  )
}

export default TeamDetails