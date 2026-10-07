import React from "react";

import logo2024 from "../../assets/logo1.webp";
import logo2023 from "../../assets/logo2.webp";
import logoCommunity2023 from "../../assets/logo3.webp";
import logo2022a from "../../assets/logo4.webp";
import logo2022b from "../../assets/logo5.webp";
import logoCommunity2022 from "../../assets/logo6.webp";

import "./AwardsShowcase.css";

const awards = [
  {
    img: logo2024,
    year: "2024",
    text: "WINNER",
    alt: "2024 Top Rated Provider Intern Abroad",
  },
  {
    img: logo2023,
    year: "2023",
    text: "WINNER",
    alt: "2023 Top Rated Provider Intern Abroad",
  },
  {
    img: logoCommunity2023,
    year: "2023",
    text: "WINNER",
    alt: "2023 Community Choice Awards Intern Provider",
  },
  {
    img: logo2022a,
    year: "2022",
    text: "WINNER",
    alt: "2022 Top Rated Organization Internships Abroad",
  },
  {
    img: logo2022b,
    year: "2022",
    text: "WINNER",
    alt: "2022 Top Online Program Internships Abroad",
  },
  {
    img: logoCommunity2022,
    year: "2022",
    text: "WINNER",
    alt: "2022 Community Choice Awards Intern Provider",
  },
];

const AwardsShowcase = () => {
  return (
    <section className="flyixo-awards-section">

      {/* Background Decorations */}
      <div className="flyixo-awards-bg flyixo-awards-bg-one"></div>
      <div className="flyixo-awards-bg flyixo-awards-bg-two"></div>
      <div className="flyixo-awards-grid"></div>

      <div className="flyixo-awards-container">

        {/* Header */}
        <div className="flyixo-awards-header">

          <div className="flyixo-awards-eyebrow">
            <span className="flyixo-awards-line"></span>
            <span>FLYIXO RECOGNITION</span>
            <span className="flyixo-awards-line"></span>
          </div>

          <h2 className="flyixo-awards-title">
            Recognized For
            <span> Excellence</span>
          </h2>

          <p className="flyixo-awards-description">
            Our achievements reflect the trust, quality, and dedication we
            bring to international internship opportunities and global career
            experiences.
          </p>

        </div>

        {/* Awards */}
        <div className="flyixo-awards-list">

          {awards.map(({ img, year, text, alt }, index) => (
            <article
              key={index}
              className="flyixo-award-card"
            >

              {/* Number */}
              <span className="flyixo-award-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Award Image */}
              <div className="flyixo-award-image-wrapper">

                <div className="flyixo-award-image-glow"></div>

                <div className="flyixo-award-image-box">
                  <img
                    src={img}
                    alt={alt}
                    className="flyixo-award-image"
                  />
                </div>

              </div>

              {/* Award Details */}
              <div className="flyixo-award-content">

                <span className="flyixo-award-year">
                  {year}
                </span>

                <span className="flyixo-award-winner">
                  {text}
                </span>

                <span className="flyixo-award-divider"></span>

                <span className="flyixo-award-label">
                  FLYIXO RECOGNITION
                </span>

              </div>

              {/* Decorative Corner */}
              <span className="flyixo-award-corner"></span>

            </article>
          ))}

        </div>

        {/* Bottom Trust */}
        <div className="flyixo-awards-bottom">

          <div className="flyixo-awards-bottom-line"></div>

          <p>
            Trusted experience. Global opportunities.{" "}
            <strong>Flyixo</strong>.
          </p>

          <div className="flyixo-awards-bottom-line"></div>

        </div>

      </div>
    </section>
  );
};

export default AwardsShowcase;