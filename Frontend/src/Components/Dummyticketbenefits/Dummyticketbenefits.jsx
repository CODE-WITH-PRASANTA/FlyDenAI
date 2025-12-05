// BenefitsSection.jsx
import React from "react";
import "./Dummyticketbenefits.css";

const benefits = [
  {
    id: 1,
    title: "WE WORK 24/7",
    text: "FlyDenAi operates round the clock to ensure your flight and hotel reservations are processed anytime you need—day or night.",
    icon: "🕒",
  },
  {
    id: 2,
    title: "TIME SAVING",
    text: "Our streamlined reservation process helps you save valuable time, making visa documentation and travel planning faster and easier.",
    icon: "🌍",
  },
  {
    id: 3,
    title: "BEST VALUE GUARANTEED",
    text: "FlyDenAi offers competitive pricing and transparent charges—ensuring you get premium service at the most affordable rates.",
    icon: "💲",
  },
  {
    id: 4,
    title: "FAST SUPPORT RESPONSE",
    text: "Our dedicated support team responds quickly to all queries, giving you a smooth and stress-free experience.",
    icon: "💬",
  },
  {
    id: 5,
    title: "CONFIRMATION WITHIN 30 MINUTES",
    text: "Receive your dummy ticket or reservation confirmation typically within 10–30 minutes, perfect for urgent visa submissions.",
    icon: "📩",
  },
  {
    id: 6,
    title: "TRUSTED BY THOUSANDS",
    text: "FlyDenAi partners with reliable travel networks to deliver secure, accurate, and embassy-accepted travel reservations.",
    icon: "✔️",
  },
];

const BenefitsSection = () => {
  return (
    <section className="benefits">
      <div className="benefits__container">
        <h2 className="benefits__heading">Benefits: Why Choose FlyDenAi</h2>

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
