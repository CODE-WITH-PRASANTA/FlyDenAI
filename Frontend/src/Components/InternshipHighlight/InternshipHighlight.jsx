import React from "react";
import "./InternshipHighlight.css";

import card1 from "../../assets/intern-card1.webp";
import card2 from "../../assets/intern-card2.webp";
import card3 from "../../assets/intern-card3.webp";
import card4 from "../../assets/intern-card4.webp";
import card5 from "../../assets/intern-card5.webp";
import card6 from "../../assets/intern-card6.webp";

const InternshipHighlights = () => {
  const highlights = [
    {
      id: 1,
      title: "Personalized international internships that advance your career",
      text: "Get matched with a world-class internship placement tailored to your unique goals, budget, and availability.",
      link: "Find your internship →",
      image: card1,
      reverse: false,
    },
    {
      id: 2,
      title:
        "Experience cultural immersion while working with English-speaking professionals",
      text: "Almost all our internships can be conducted in English no matter where you're located - or practice your local language skills as an extra benefit!",
      link: "See how it works →",
      image: card2,
      reverse: true,
    },
    {
      id: 3,
      title: "Proven to enhance resume credentials and job prospects",
      text: "Build the hands-on experience, cultural intelligence, and international exposure you need to get ahead in today's job market.",
      link: "See how we help you excel →",
      image: card3,
      reverse: false,
    },
    {
      id: 4,
      title: "Short duration internships that offer unbeatable value",
      text: "Intern abroad from just $1129 with your accommodation and meals included. Choose when you want to start and your preferred duration from 2 to 24 weeks.",
      link: "See what's included →",
      image: card4,
      reverse: true,
    },
    {
      id: 5,
      title: "Earn academic credits while you intern",
      text: "If you're a student, you could save thousands of dollars on tuition fees by earning course credits during your internship.",
      link: "Explore course credit options →",
      image: card5,
      reverse: false,
    },
    {
      id: 6,
      title: "The ethical and sustainable choice",
      text: "We're a Certified B Corporation, 100% carbon neutral, and are committed to offering ethical, locally-driven internships that are mutually beneficial for interns and host organizations.",
      link: "Read about our commitments to sustainability →",
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

export default InternshipHighlights;
