import React from 'react'
import Dummtticketnews from '../../Components/Dummtticketnews/Dummtticketnews'
import Dummyticketfeature from '../../Components/Dummyticketfeature/Dummyticketfeature'
import Dummyticketvisa from '../../Components/Dummyticketvisa/Dummyticketvisa'
import Dummyticketwhybooking from '../../Components/Dummyticketwhybooking/Dummyticketwhybooking'
import Dummyticketbenefits from '../../Components/Dummyticketbenefits/Dummyticketbenefits'
import Dummyticketwhytrip from '../../Components/Dummyticketwhytrip/Dummyticketwhytrip'
import Dummyticketpricing from '../../Components/Dummyticketpricing/Dummyticketpricing'
import Dummyticketclients from '../../Components/Dummyticketclients/Dummyticketclients'
import DummyTicketBooking from '../../Components/DummyTicketBooking/DummyTicketBooking'

const Dummyticketsection = () => {
  return (
    <>
        <DummyTicketBooking />
        <Dummtticketnews/>
        <Dummyticketfeature/>
        <Dummyticketvisa/>
        <Dummyticketwhybooking/>
        <Dummyticketbenefits/>
        <Dummyticketwhytrip/>
        <Dummyticketpricing/>
        <Dummyticketclients/>
    </>
  )
}

export default Dummyticketsection