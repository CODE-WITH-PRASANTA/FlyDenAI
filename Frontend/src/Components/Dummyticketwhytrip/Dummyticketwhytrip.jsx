// WhyFlyDenAiHolidays.jsx
import React from "react";
import "./Dummyticketwhytrip.css";

import hostessImg from "../../assets/if-img.webp";

const bulletPoints = [
  "Valid dummy flight or hotel booking as per embassy visa requirements.",
  "Instant PDF download of your reservation — ready for visa submission.",
  "Same pricing for one-way, roundtrip, and multi-city reservations (calculated per passenger).",
  "Avoid transit through countries requiring separate transit visas such as USA or UK.",
  "Unlimited free date changes if your travel plan is updated.",
  "No cancellation charges — fully flexible service.",
];

const PlaneIcon = () => (
  <svg className="plane-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 9.24c0-.74-.6-1.34-1.34-1.34H14L8.62 2.5H6.5l3.08 5.4H4.5L2.4 6H1l1.5 3L1 12h1.4l2.1-1.4h5.08L6.5 16h2.12L14 12.1h6.66c.74 0 1.34-.6 1.34-1.34 0-.37-.15-.71-.4-.96-.25-.25-.39-.6-.39-.96z" />
  </svg>
);

const WhyFlyDenAiHolidays = () => {
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
          <h2 className="why-trip__heading">Why Choose FlyDenAi Holidays?</h2>

          <p className="why-trip__intro">
            FlyDenAi brings over a decade of professional expertise in travel,
            tourism, and visa documentation services. We stay updated with the
            latest visa requirements for countries across Europe, Asia, Africa,
            the Americas, Australia & New Zealand — ensuring your documents stay
            compliant, reliable, and embassy-ready.  
            Our goal is to minimize your travel risks and make your visa process
            smooth and stress-free.
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

export default WhyFlyDenAiHolidays;
