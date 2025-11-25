// BenefitsSection.jsx
import React from "react";
import "./Dummyticketbenefits.css";

const benefits = [
  {
    id: 1,
    title: "WE WORK 24/7",
    text: "Our dedicated team is available around the clock to assist you with your ticket reservations whenever you need us.",
    icon: "🕒",
  },
  {
    id: 2,
    title: "TIME SAVING",
    text: "Enjoy a hassle-free experience with our quick and efficient ticket booking process that saves you valuable time.",
    icon: "🌍",
  },
  {
    id: 3,
    title: "BEST VALUE",
    text: "We offer competitive pricing and exclusive deals to ensure you get the best value for your ticket purchases.",
    icon: "💲",
  },
  {
    id: 4,
    title: "PROMPT RESPONSE",
    text: "Our customer support team is committed to responding quickly to your queries and concerns.",
    icon: "💬",
  },
  {
    id: 5,
    title: "GET CONFIRMATION WITHIN 30 MIN",
    text: "Experience peace of mind with instant or near-instant confirmation for your bookings.",
    icon: "📩",
  },
  {
    id: 6,
    title: "TRUSTED TRAVEL PARTNERS",
    text: "We collaborate with trusted airlines and travel partners to ensure a reliable booking experience.",
    icon: "✔️",
  },
];

const BenefitsSection = () => {
  return (
    <section className="benefits">
      <div className="benefits__container">
        <h2 className="benefits__heading">Benefits: Why Choose TripCafe</h2>

        <div className="benefits__grid">
          {benefits.map((item) => (
            <div className="benefit-card" key={item.id}>
              <div className="benefit-card__icon-wrap">
                <span className="benefit-card__icon">{item.icon}</span>
              </div>

              <h3 className="benefit-card__title">{item.title}</h3>

              <p className="benefit-card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
