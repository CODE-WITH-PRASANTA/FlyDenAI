// FeaturesStrip.jsx
import React from "react";
import "./Dummyticketfeature.css";

const features = [
  { title: "Secure Payment", icon: "🔒" },
  { title: "24x7 Support", icon: "👥" },
  { title: "5+ Years of Travel Expertise", icon: "🛡️" },
  { title: "Trusted Travel Partners", icon: "✈️" },
  { title: "Money-Back Guarantee", icon: "💰" },
];

const FeaturesStrip = () => {
  return (
    <section className="features-container">
      {features.map((item) => (
        <div className="feature-card" key={item.title}>
          <div className="feature-icon-wrapper">
            <span className="feature-icon">{item.icon}</span>
          </div>
          <p className="feature-title">{item.title}</p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesStrip;
