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
      title:
        "Gain Real Experience in a Cross-Cultural, English-Speaking Environment",
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
      title:
        "Committed to Ethical, Sustainable, and Impactful Internships",
      text: "As a Certified B Corporation and 100% carbon-neutral organization, we ensure every internship supports local communities and creates meaningful, ethical impact for all participants.",
      link: "Learn about our sustainability promise →",
      image: card6,
      reverse: true,
    },
  ];

  return (
    <section className="flyixo-internship-section">
      {/* Background Decorations */}
      <div className="flyixo-internship-bg flyixo-internship-bg-one"></div>
      <div className="flyixo-internship-bg flyixo-internship-bg-two"></div>
      <div className="flyixo-internship-grid"></div>

      <div className="flyixo-internship-container">

        {/* ================= HEADER ================= */}
        <div className="flyixo-internship-header">

          <div className="flyixo-internship-eyebrow">
            <span className="flyixo-internship-line"></span>
            <span>FLYIXO INTERNSHIP EXPERIENCE</span>
            <span className="flyixo-internship-line"></span>
          </div>

          <h2 className="flyixo-internship-title">
            Thousands of Young Professionals
            <span> Have Interned Abroad With Us.</span>
          </h2>

          <p className="flyixo-internship-subtitle">
            Discover why ambitious students and young professionals choose
            international internships to build skills, gain experience, and
            create a stronger global career.
          </p>

        </div>

        {/* ================= HIGHLIGHTS ================= */}
        <div className="flyixo-internship-highlights">

          {highlights.map((item) => (
            <article
              key={item.id}
              className={`flyixo-highlight-card ${
                item.reverse ? "flyixo-highlight-card-reverse" : ""
              }`}
            >

              {/* Number */}
              <div className="flyixo-highlight-number">
                {String(item.id).padStart(2, "0")}
              </div>

              {/* Image */}
              <div className="flyixo-highlight-image-wrapper">

                <div className="flyixo-highlight-image">
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="flyixo-highlight-image-overlay"></div>

                  <div className="flyixo-highlight-image-label">
                    <span>FLYIXO</span>
                    <strong>GLOBAL INTERNSHIP</strong>
                  </div>
                </div>

                <div className="flyixo-highlight-image-decoration"></div>

              </div>

              {/* Content */}
              <div className="flyixo-highlight-content">

                <span className="flyixo-highlight-label">
                  INTERNSHIP BENEFIT {String(item.id).padStart(2, "0")}
                </span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <a
                  href="#"
                  className="flyixo-highlight-link"
                  onClick={(event) => event.preventDefault()}
                >
                  <span>{item.link.replace(" →", "")}</span>

                  <span className="flyixo-highlight-arrow">
                    →
                  </span>
                </a>

                <div className="flyixo-highlight-bottom-line">
                  <span></span>
                  <small>FLYIXO GLOBAL OPPORTUNITIES</small>
                </div>

              </div>

              {/* Decorative Corner */}
              <span className="flyixo-highlight-corner"></span>

            </article>
          ))}

        </div>

        {/* ================= CTA ================= */}
        <div className="flyixo-internship-cta">

          <div className="flyixo-cta-content">
            <span className="flyixo-cta-label">
              READY TO START?
            </span>

            <h3>
              Choose Your Next Global Opportunity
            </h3>

            <p>
              Find an international internship that matches your career goals
              and take your first step toward a global professional journey.
            </p>
          </div>

          <button
            type="button"
            className="flyixo-choose-btn"
          >
            <span>Choose Where To Go</span>
            <span className="flyixo-choose-arrow">→</span>
          </button>

        </div>

        {/* ================= BOTTOM BRAND ================= */}
        <div className="flyixo-internship-bottom">
          <span></span>

          <p>
            Global experience. Professional growth.{" "}
            <strong>Flyixo</strong>.
          </p>

          <span></span>
        </div>

      </div>
    </section>
  );
};

export default InternshipHighlight;