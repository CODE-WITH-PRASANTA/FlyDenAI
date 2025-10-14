import React from 'react';
import './FlyDenAdvantage.css';

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

const FlyDenAdvantage = () => {
  return (
    <section className="flyden-advantage-section">
      <h2 className="flyden-advantage-heading">
        FlyDenAi <span>Advantages</span>
      </h2>

      <div className="flyden-advantages-grid">
        {advantages.map((item, index) => (
          <div key={index} className="flyden-advantage-card">
            <div className="flyden-icon-wrapper">
              <span className="flyden-icon">{item.icon}</span>
            </div>
            <div className="flyden-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlyDenAdvantage;
