// WhyBookingDocument.jsx
import React from "react";
import "./Dummyticketwhybooking.css";

import visaIllustration from "../../assets/hf-img.webp";

const WhyBookingDocument = () => {
  return (
    <section className="why-booking">
      <div className="why-booking__container">

        {/* LEFT TEXT */}
        <div className="why-booking__content">
          <h2 className="why-booking__title">
            Why Do I Need a Flight & Hotel Booking Document for a Visa?
          </h2>

          <p className="why-booking__text">
            When applying for an international visa, most embassies and
            consulates require proof of travel arrangements. This includes a
            verifiable <strong>flight reservation</strong> and
            <strong> hotel booking</strong>. These documents help embassies
            confirm your travel intent, duration of stay, and return plans.
            However, you are <strong>not required to purchase a real ticket</strong>.
            A dummy flight reservation or temporary hotel booking is fully
            acceptable for visa applications.
          </p>

          <p className="why-booking__text">
            <strong>FlyDenAi</strong> provides instant, fully verifiable
            <strong> dummy flight tickets, hotel bookings, and travel documents</strong>
            that meet all international visa requirements. Our documents are
            embassy-approved and suitable for:
            <br />— Schengen Visa  
            — USA Visa  
            — UK Visa  
            — Canada Visa  
            — Dubai Visa  
            — Singapore & Malaysia Visa  
            — All global tourism and business visa applications
          </p>

          <p className="why-booking__text">
            With FlyDenAi, you avoid paying high airline and hotel costs upfront.
            We deliver your required visa documents within minutes, ensuring your
            application remains complete, valid, and professional.  
            <strong>Fast, affordable, reliable — FlyDenAi is your trusted visa documentation partner.</strong>
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="why-booking__image-wrap">
          <img
            src={visaIllustration}
            alt="Visa application dummy ticket document"
            className="why-booking__image"
          />
        </div>

      </div>
    </section>
  );
};

export default WhyBookingDocument;
