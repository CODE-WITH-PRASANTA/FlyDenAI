import React from 'react'
import './DummyTicketBooking.css'
import DummyTicketBookingForm from '../../Components/DummyTicketBookingForm/DummyTicketBookingForm'
import DummyTicketFormBanner from '../../Components/DummyTicketFormBanner/DummyTicketFormBanner'
import { useLocation } from "react-router-dom";

const DummyTicketBooking = () => {
  const location = useLocation();
  const bookingData = location.state;

  return (
    <div>
        <DummyTicketFormBanner />
        <DummyTicketBookingForm bookingData={bookingData} />
    </div>
  )
}

export default DummyTicketBooking;
