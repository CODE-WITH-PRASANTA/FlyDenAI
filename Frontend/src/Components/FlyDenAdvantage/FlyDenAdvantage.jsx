import React from "react";
import "./FlyDenAdvantage.css";

const advantages = [
  {
    icon: "🎓",
    title: "Global Program",
    description: "Curated courses that match your career goals",
  },
  {
    icon: "👤",
    title: "Expert Guidance",
    description: "Personalized counselling for smooth admissions",
  },
  {
    icon: "📒",
    title: "Language Prep",
    description: "English & test preparation made simple",
  },
  {
    icon: "📁",
    title: "Visa Assistance",
    description: "Step-by-step support to secure your study visa",
  },
  {
    icon: "💰",
    title: "Scholarships & Aid",
    description: "Maximize funding opportunities for your studies",
  },
  {
    icon: "🏡",
    title: "Accommodation Help",
    description: "Find safe and convenient housing abroad",
  },
  {
    icon: "🛫",
    title: "Travel Assistance",
    description: "Smooth airport pickup and travel guidance",
  },
  {
    icon: "📊",
    title: "Career Support",
    description: "Post-study career counselling & internship help",
  },
];

const FlyixoAdvantage = () => {
  return (
    <section className="flyixo-advantage-section">

      {/* Background Decorations */}
      <div className="flyixo-advantage-bg flyixo-advantage-bg-one"></div>
      <div className="flyixo-advantage-bg flyixo-advantage-bg-two"></div>
      <div className="flyixo-advantage-grid-pattern"></div>

      <div className="flyixo-advantage-container">

        {/* Header */}
        <div className="flyixo-advantage-header">

          <div className="flyixo-advantage-eyebrow">
            <span className="flyixo-advantage-eyebrow-line"></span>

            <span>WHY CHOOSE FLYIXO</span>

            <span className="flyixo-advantage-eyebrow-line"></span>
          </div>

          <h2 className="flyixo-advantage-heading">
            Flyixo <span>Advantages</span>
          </h2>

          <p className="flyixo-advantage-intro">
            Everything you need for a smooth, confident, and successful
            study abroad journey — all supported by Flyixo.
          </p>

        </div>

        {/* Advantages */}
        <div className="flyixo-advantages-grid">

          {advantages.map((item, index) => (
            <article
              key={index}
              className="flyixo-advantage-card"
            >

              {/* Card Number */}
              <span className="flyixo-advantage-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Top Accent */}
              <span className="flyixo-advantage-accent"></span>

              {/* Icon */}
              <div className="flyixo-icon-wrapper">

                <div className="flyixo-icon-glow"></div>

                <div className="flyixo-icon-inner">
                  <span className="flyixo-icon">
                    {item.icon}
                  </span>
                </div>

              </div>

              {/* Content */}
              <div className="flyixo-advantage-text">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

              {/* Bottom */}
              <div className="flyixo-advantage-footer">

                <span>Flyixo Advantage</span>

                <span className="flyixo-advantage-arrow">
                  →
                </span>

              </div>

              {/* Corner Decoration */}
              <span className="flyixo-advantage-corner"></span>

            </article>
          ))}

        </div>

        {/* Bottom Trust */}
        <div className="flyixo-advantage-bottom">

          <span className="flyixo-advantage-bottom-line"></span>

          <p>
            Professional guidance. Global opportunities.{" "}
            <strong>Flyixo.</strong>
          </p>

          <span className="flyixo-advantage-bottom-line"></span>

        </div>

      </div>
    </section>
  );
};

export default FlyixoAdvantage;