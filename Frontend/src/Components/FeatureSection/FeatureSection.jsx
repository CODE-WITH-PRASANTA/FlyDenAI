// FeatureSection.jsx
import React from "react";
import "./FeatureSection.css";

import feature1 from "../../assets/feature1.webp";
import feature2 from "../../assets/feature2.webp";
import feature3 from "../../assets/feature3.webp";
import feature4 from "../../assets/feature4.webp";
import feature5 from "../../assets/feature5.webp";
import feature6 from "../../assets/feature6.webp";

const features = [
  {
    image: feature1,
    title: "Social Science Internship Scholarship",
    description: "Apply today for a remote or abroad scholarship in the Social Science field of your choice.",
    link: "#",
  },
  {
    image: feature2,
    title: "Top 5 Internship Destinations for 2025 & 2026",
    description: "Curious where everyone's going this year and next year? Here are 5 top internship destinations our interns are choosing for 2025 & 2026. Will one of these inspire your next big adventure?",
    link: "#",
  },
  {
    image: feature3,
    title: "Winter Break Internships",
    description: "Explore the top recommendations for an internship this winter break.",
    link: "#",
  },
  {
    image: feature4,
    title: "Top Virtual Internships For Students & Grads",
    description: "Discover remote internship opportunities that fit your lifestyle and career goals.",
    link: "#",
  },
  {
    image: feature5,
    title: "Top-Rated Medical Internships Abroad",
    description: "Gain real-world experience in the medical field with top-rated international programs.",
    link: "#",
  },
  {
    image: feature6,
    title: "Intern Success Stories",
    description: "Read inspiring stories from interns who turned their placements into career-launching opportunities.",
    link: "#",
  },
];

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <h2 className="feature-header">Featured success stories, travel guides & inspiration</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.image} alt={feature.title} className="feature-image" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <a href={feature.link} className="feature-link">Read more</a>
          </div>
        ))}
      </div>
      <div className="feature-button-container">
        <button className="explore-guides-btn">Explore our travel guides</button>
      </div>
    </section>
  );
};

export default FeatureSection;
