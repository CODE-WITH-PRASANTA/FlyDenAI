// PricingPlans.jsx
import React from "react";
import "./Dummyticketpricing.css";

// OPTIONAL: background image (map / pattern behind cards)
import pricingBg from "../../assets/jf-img.webp";

// Card illustrations
import flightImg from "../../assets/kf-img.webp";
import hotelImg from "../../assets/lf-img.webp";
import insuranceImg from "../../assets/mf-img.webp";

const plans = [
  {
    id: 1,
    title: "Flight Reservation",
    img: flightImg,
    price: "₹500",
    subLabel: "Per Person or Child",
    extraLabel: "",
    features: [
      "Urgent Delivery between 30 to 60 minutes.",
      "No Fee To Change Date",
      "Price is for oneway and round-trip. Flight reservation for multi-city available at extra cost.",
    ],
  },
  {
    id: 2,
    title: "Hotel Reservation",
    img: hotelImg,
    price: "₹500",
    subLabel: "Per Person or Child",
    extraLabel: "",
    features: [
      "Urgent Delivery between 30 to 60 minutes.",
      "No Fee To Change Date",
      "Price is for one hotel booking. Hotel booking for multi city available at extra cost.",
    ],
  },
  {
    id: 3,
    title: "Travel Insurance",
    img: insuranceImg,
    price: "₹1500",
    subLabel: "Per Person or Child",
    extraLabel: "For 6 Days",
    features: [
      "Urgent Delivery between 30 to 60 minutes.",
      "Affordable and accepted for visa and immigration.",
      "Price is Including Consultant Charge.",
      "Genuine insurance & claim if you are injured.",
    ],
  },
];

const Dummyticketpricing = () => {
  return (
    <section
      className="pricing"
      style={{ backgroundImage: `url(${pricingBg})` }}
    >
      <div className="pricing__container">
        <h2 className="pricing__heading">Pricing &amp; Plans</h2>

        <div className="pricing__grid">
          {plans.map((plan) => (
            <article className="plan-card" key={plan.id}>
              <h3 className="plan-card__title">{plan.title}</h3>

              <div className="plan-card__image-wrap">
                <img
                  src={plan.img}
                  alt={plan.title}
                  className="plan-card__image"
                />
              </div>

              <div className="plan-card__price-block">
                <span className="plan-card__price">{plan.price}</span>
                <span className="plan-card__per">/Per Person or Child</span>
                {plan.extraLabel && (
                  <span className="plan-card__extra">{plan.extraLabel}</span>
                )}
              </div>

              <div className="plan-card__divider" />

              <ul className="plan-card__features">
                {plan.features.map((feature, idx) => (
                  <li className="plan-card__feature" key={idx}>
                    {feature}
                    {idx !== plan.features.length - 1 && (
                      <div className="plan-card__inner-divider" />
                    )}
                  </li>
                ))}
              </ul>

              <button className="plan-card__btn">Get Started</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dummyticketpricing;
