import React from "react";
import {
  FaArrowRight,
  FaBookOpen,
  FaCompass,
  FaStar,
} from "react-icons/fa";

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
    description:
      "Apply today for a remote or abroad scholarship in the Social Science field of your choice.",
    link: "#",
  },
  {
    image: feature2,
    title: "Top 5 Internship Destinations for 2025 & 2026",
    description:
      "Curious where everyone's going this year and next year? Here are 5 top internship destinations our interns are choosing for 2025 & 2026. Will one of these inspire your next big adventure?",
    link: "#",
  },
  {
    image: feature3,
    title: "Winter Break Internships",
    description:
      "Explore the top recommendations for an internship this winter break.",
    link: "#",
  },
  {
    image: feature4,
    title: "Top Virtual Internships For Students & Grads",
    description:
      "Discover remote internship opportunities that fit your lifestyle and career goals.",
    link: "#",
  },
  {
    image: feature5,
    title: "Top-Rated Medical Internships Abroad",
    description:
      "Gain real-world experience in the medical field with top-rated international programs.",
    link: "#",
  },
  {
    image: feature6,
    title: "Intern Success Stories",
    description:
      "Read inspiring stories from interns who turned their placements into career-launching opportunities.",
    link: "#",
  },
];

const FeatureSection = () => {
  const handleExplore = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="flyixo-feature-section">

      {/* Background Decorations */}
      <div className="flyixo-feature-bg flyixo-feature-bg-one"></div>
      <div className="flyixo-feature-bg flyixo-feature-bg-two"></div>
      <div className="flyixo-feature-grid-pattern"></div>

      <div className="flyixo-feature-container">

        {/* Header */}
        <div className="flyixo-feature-header">

          <div className="flyixo-feature-eyebrow">
            <span className="flyixo-feature-line"></span>

            <span>
              FLYIXO INSPIRATION
            </span>

            <span className="flyixo-feature-line"></span>
          </div>

          <div className="flyixo-feature-heading-icon">
            <FaBookOpen />
          </div>

          <h2 className="flyixo-feature-title">
            Featured Success Stories,
            <span> Travel Guides & Inspiration</span>
          </h2>

          <p className="flyixo-feature-subtitle">
            Explore useful guides, inspiring internship stories,
            destination ideas, and career opportunities designed to
            help you take your next step with Flyixo.
          </p>

        </div>

        {/* Feature Grid */}
        <div className="flyixo-feature-grid-list">

          {features.map((feature, index) => (
            <article
              className="flyixo-feature-card"
              key={index}
            >

              {/* Card Number */}
              <span className="flyixo-feature-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Image */}
              <div className="flyixo-feature-image-wrapper">

                <img
                  src={feature.image}
                  alt={feature.title}
                  className="flyixo-feature-image"
                />

                <div className="flyixo-feature-image-overlay"></div>

                <div className="flyixo-feature-image-top">

                  <span className="flyixo-feature-category">
                    FLYIXO GUIDE
                  </span>

                  <span className="flyixo-feature-star">
                    <FaStar />
                  </span>

                </div>

                <div className="flyixo-feature-image-bottom">
                  <span>
                    GLOBAL OPPORTUNITY
                  </span>
                </div>

              </div>

              {/* Content */}
              <div className="flyixo-feature-content">

                <h3 className="flyixo-feature-card-title">
                  {feature.title}
                </h3>

                <p className="flyixo-feature-description">
                  {feature.description}
                </p>

                <div className="flyixo-feature-card-footer">

                  <a
                    href={feature.link}
                    className="flyixo-feature-link"
                    onClick={(event) =>
                      event.preventDefault()
                    }
                  >
                    <span>Read More</span>

                    <span className="flyixo-feature-link-icon">
                      <FaArrowRight />
                    </span>
                  </a>

                  <span className="flyixo-feature-card-label">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

              </div>

              {/* Decorative Corner */}
              <span className="flyixo-feature-card-corner"></span>

            </article>
          ))}

        </div>

        {/* Explore Button */}
        <div className="flyixo-feature-button-container">

          <button
            type="button"
            className="flyixo-explore-guides-btn"
            onClick={handleExplore}
          >
            <span className="flyixo-explore-icon">
              <FaCompass />
            </span>

            <span>
              Explore Our Travel Guides
            </span>

            <span className="flyixo-explore-arrow">
              <FaArrowRight />
            </span>
          </button>

        </div>

        {/* Bottom Trust */}
        <div className="flyixo-feature-bottom">

          <div className="flyixo-feature-bottom-line"></div>

          <p>
            Discover. Learn. Explore.{" "}
            <strong>Flyixo</strong>.
          </p>

          <div className="flyixo-feature-bottom-line"></div>

        </div>

      </div>
    </section>
  );
};

export default FeatureSection;