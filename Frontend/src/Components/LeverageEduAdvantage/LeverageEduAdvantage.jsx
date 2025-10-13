import React from 'react';
import './LeverageEduAdvantage.css';

const advantages = [
  {
    icon: "🎓",
    title: "Finding the Program",
    description: "That’s Right for You",
  },
  {
    icon: "👤",
    title: "Curated Expert-led",
    description: "Application Assistance",
  },
  {
    icon: "📒",
    title: "English Assessment",
    description: "Test Prep On-the-go",
  },
  {
    icon: "📁",
    title: "Hacking thy Interviews",
    description: "& the All-important VISA",
  },
  {
    icon: "💰",
    title: "Solving for",
    description: "Money Money Money!",
  },
  {
    icon: "🏡",
    title: "Making Sure You Stay Right,",
    description: "And Stay Well",
  },
];

const LeverageEduAdvantage = () => {
  return (
    <section className="leverage-container">
      <h2 className="leverage-heading">
        Leverage Edu <span>Advantage</span>
      </h2>

      <div className="advantages-grid">
        {advantages.map((item, index) => (
          <div key={index} className="advantage-card">
            <div className="icon-wrapper">
              <span className="icon">{item.icon}</span>
            </div>
            <div className="text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeverageEduAdvantage;
