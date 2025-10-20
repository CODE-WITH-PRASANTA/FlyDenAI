import React from "react";
import "./InternshipHighlight.css";

import card1 from "../../assets/intern-card1.webp";
import card2 from "../../assets/intern-card2.webp";
import card3 from "../../assets/intern-card3.webp";
import card4 from "../../assets/intern-card4.webp";
import card5 from "../../assets/intern-card5.webp";
import card6 from "../../assets/intern-card6.webp";

const InternshipHighlight = () => {
const highlights = [
  {
    id: 1,
    title: "Customized Global Internships Designed to Boost Your Career",
    text: "Secure a top-tier international internship specifically curated for your career goals, budget, and preferred timeline — giving you an edge in today’s global job market.",
    link: "Discover your perfect internship →",
    image: card1,
    reverse: false,
  },
  {
    id: 2,
    title: "Gain Real Experience in a Cross-Cultural, English-Speaking Environment",
    text: "Work alongside experienced professionals from around the world. Most of our placements are English-based, so you can excel professionally while immersing yourself in a new culture.",
    link: "Explore internship experience →",
    image: card2,
    reverse: true,
  },
  {
    id: 3,
    title: "Strengthen Your Resume with Global Work Experience",
    text: "Develop professional expertise, cultural intelligence, and international exposure that employers value — positioning yourself ahead of the competition.",
    link: "Learn how we help you stand out →",
    image: card3,
    reverse: false,
  },
  {
    id: 4,
    title: "Flexible, Short-Term Internships That Fit Your Schedule",
    text: "Join international internships starting from just $1129 — including accommodation and meals. Choose flexible start dates and durations from 2 to 24 weeks.",
    link: "Check what's included →",
    image: card4,
    reverse: true,
  },
  {
    id: 5,
    title: "Earn Academic Credits While You Gain Experience",
    text: "Turn your internship into a valuable academic opportunity. Many of our programs qualify for university credit, helping you save on tuition while advancing your degree.",
    link: "See credit eligibility →",
    image: card5,
    reverse: false,
  },
  {
    id: 6,
    title: "Committed to Ethical, Sustainable, and Impactful Internships",
    text: "As a Certified B Corporation and 100% carbon-neutral organization, we ensure every internship supports local communities and creates meaningful, ethical impact for all participants.",
    link: "Learn about our sustainability promise →",
    image: card6,
    reverse: true,
  },
];


  return (
    <div className="internship-section">
      {/* Header Added Here */}
      <h2 className="internship-header">
        Thousands of young professionals have interned abroad with us. Here's why.
      </h2>

      {highlights.map((item) => (
        <div
          key={item.id}
          className={`highlight-card ${item.reverse ? "reverse" : ""}`}
        >
          <div className="highlight-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="highlight-content">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <a href="#">{item.link}</a>
          </div>
        </div>
      ))}

      <div className="choose-button-container">
        <button className="choose-btn">Choose where to go</button>
      </div>
    </div>
  );
};

export default InternshipHighlight;
