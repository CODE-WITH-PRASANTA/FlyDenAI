import React from 'react'
import './Home.css'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Welcome from '../../Components/Welcome/Welcome'
import VisaCategory from '../../Components/VisaCategory/VisaCategory'
import WhatWeDo from '../../Components/WhatWeDo/WhatWeDo'
import CountriesSection from '../../Components/CountriesSection/CountriesSection'
import Testimonials from '../../Components/Testimonials/Testimonials'
import Stats from '../../Components/Stats/Stats'
import News from '../../Components/News/News'
import LogoSlider from '../../Components/LogoSlider/LogoSlider'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <Welcome/>
        <VisaCategory/>
        <WhatWeDo/>
        <Testimonials/>
        <CountriesSection/>
        <Stats/>
        <LogoSlider/>
        <News/>

    </div>
  )
}

export default Home