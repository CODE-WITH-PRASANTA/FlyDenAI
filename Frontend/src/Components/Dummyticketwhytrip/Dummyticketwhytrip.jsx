// WhyTripCafeHolidays.jsx
import React from "react";
import "./Dummyticketwhytrip.css";

// change this path to your actual image file
import hostessImg from "../../assets/if-img.webp"; // e.g. your illustration

const bulletPoints = [
  "Valid dummy flight or hotel booking per the visa application criteria",
  "Instant download your PDF reservation.",
  "The price for one-way, roundtrip, and multi-city flights is the same and is calculated as double the stated price per passenger.",
  "Avoid flight transit in the US, UK or any country that require a transit visa.",
  "Unlimited date revision should you change your travel plan.",
  "No cancellation fee",
];

const PlaneIcon = () => (
  <svg
    className="plane-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22 9.24c0-.74-.6-1.34-1.34-1.34H14L8.62 2.5H6.5l3.08 5.4H4.5L2.4 6H1l1.5 3L1 12h1.4l2.1-1.4h5.08L6.5 16h2.12L14 12.1h6.66c.74 0 1.34-.6 1.34-1.34 0-.37-.15-.71-.4-.96-.25-.25-.39-.6-.39-.96z" />
  </svg>
);

const WhyTripCafeHolidays = () => {
  return (
    <section className="why-trip">
      <div className="why-trip__container">
        {/* LEFT IMAGE */}
        <div className="why-trip__image-wrap">
          <img
            src={hostessImg}
            alt="Flight attendant with suitcase"
            className="why-trip__image"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="why-trip__content">
          <h2 className="why-trip__heading">Why TripCafeHolidays?</h2>

          <p className="why-trip__intro">
            We are a team of professionals with over a decade of expertise in
            travel and tourism. We stay abreast with the visa application
            requirements of various nations across Asia, Europe, Africa,
            Americas, Australia, and New Zealand. This minimizes your loss in
            case there is refusal on visa issuance from the embassy for any
            reason.
          </p>

          <ul className="why-trip__list">
            {bulletPoints.map((text, index) => (
              <li className="why-trip__list-item" key={index}>
                <PlaneIcon />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyTripCafeHolidays;
