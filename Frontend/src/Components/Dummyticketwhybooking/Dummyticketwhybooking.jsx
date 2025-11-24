// WhyBookingDocument.jsx
import React from "react";
import "./Dummyticketwhybooking.css";

// change the path/name to your actual image file
import visaIllustration from "../../assets/hf-img.webp";

const WhyBookingDocument = () => {
  return (
    <section className="why-booking">
      <div className="why-booking__container">
        {/* LEFT: TEXT */}
        <div className="why-booking__content">
          <h2 className="why-booking__title">
            Why do I need a flight &amp; hotel booking document to apply for a
            visa?
          </h2>

          <p className="why-booking__text">
            As a citizen of a foreign nation, you must obtain an appropriate
            visa for the destination country, unless your country is on their
            list of visa-free travel nations. Embassies or consulates from most
            of the countries accept a visa application only when a verifiable
            flight or hotel booking document is attached to it. However, they
            accept a dummy flight or hotel booking. There is no need to get a
            fully-paid booking while applying for a visa. An embassy or
            consulate issues the requested visa only when it finds the
            application complete and genuine.
          </p>

          <p className="why-booking__text">
            TripCafe helps you obtain dummy reservations for flight &amp; hotel
            to any destinations or countries instantly. These reservations are
            acceptable for visa application to any country.
          </p>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="why-booking__image-wrap">
          <img
            src={visaIllustration}
            alt="Traveler watching airplane"
            className="why-booking__image"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyBookingDocument;
