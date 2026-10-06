import React from "react";
import "./SuccessStories.css";

// User avatars
import sc1 from "../../assets/sc1.webp";
import sc2 from "../../assets/sc2.webp";
import sc3 from "../../assets/sc3.webp";
import sc4 from "../../assets/sc4.webp";
import sc5 from "../../assets/sc5.webp";
import sc6 from "../../assets/sc6.webp";

// University logos
import uniLogo1 from "../../assets/ul1.webp";
import uniLogo2 from "../../assets/ul2.webp";
import uniLogo3 from "../../assets/ul3.webp";
import uniLogo4 from "../../assets/ul4.webp";

const stories = [
  {
    name: "Kshitij",
    locationFrom: "Delhi",
    locationTo: "United Kingdom",
    testimonial:
      "My Flyixo Edu coach made studying abroad a breeze. From university shortlisting to visa application, they guided me every step of the way.",
    category: "Data Science",
    img: sc1,
    uniLogo: uniLogo1,
  },
  {
    name: "Samad",
    locationFrom: "Gujarat",
    locationTo: "United Kingdom",
    testimonial:
      "Extremely satisfied with Flyixo Edu for my college application process. Deserves a perfect 5/5 rating!",
    category: "Data Science",
    img: sc2,
    uniLogo: uniLogo2,
  },
  {
    name: "Shubham",
    locationFrom: "Telangana",
    locationTo: "United States",
    testimonial:
      "Smooth process, supportive loan team, highly satisfied with Flyixo Edu's loan experience. Great service!",
    category: "Sciences",
    img: sc3,
    uniLogo: uniLogo1,
  },
  {
    name: "Naveenkumar",
    locationFrom: "Karnataka",
    locationTo: "United States",
    testimonial:
      "I applied to 4 universities and I got offers from 2 universities. Flyixo Edu helped me through entire process to pursue masters. They have separate teams to handle all this.",
    category: "Data Science",
    img: sc4,
    uniLogo: uniLogo3,
  },
  {
    name: "Shreya",
    locationFrom: "Noida",
    locationTo: "Germany",
    testimonial:
      "Flyixo Edu is proactive, detail-oriented, and trustworthy. They made my study abroad dream a breeze. Shoutout to the team for showcasing their excellence!",
    category: "Management",
    img: sc5,
    uniLogo: uniLogo4,
  },
  {
    name: "Hanna",
    locationFrom: "Maharashtra",
    locationTo: "Canada",
    testimonial:
      "Flyixo Edu made it incredibly convenient. Deepa, the consultant, provided excellent guidance. I'm thrilled with the all-in-one support for loans, forex, and accommodation.",
    category: "Data Science",
    img: sc6,
    uniLogo: uniLogo1,
  },
];

const SuccessStories = () => {
  return (
    <section className="flyixo-success-section">
      {/* Background Decorations */}
      <div className="flyixo-success-bg flyixo-success-bg-one"></div>
      <div className="flyixo-success-bg flyixo-success-bg-two"></div>
      <div className="flyixo-success-grid-pattern"></div>

      <div className="flyixo-success-container">
        {/* Header */}
        <div className="flyixo-success-header">
          <div className="flyixo-success-eyebrow">
            <span className="flyixo-success-line"></span>

            <span>FLYIXO SUCCESS STORIES</span>

            <span className="flyixo-success-line"></span>
          </div>

          <h2 className="flyixo-success-heading">
            60,000+ <span>Success Stories</span>
          </h2>

          <p className="flyixo-success-subheading">
            From Dreamers to Achievers
          </p>

          <p className="flyixo-success-description">
            Real journeys, real achievements, and inspiring experiences from
            students who turned their study abroad dreams into reality with
            Flyixo Edu.
          </p>
        </div>

        {/* Stories */}
        <div className="flyixo-stories-grid">
          {stories.map((story, idx) => (
            <article
              key={idx}
              className="flyixo-story-card"
            >
              {/* Card Number */}
              <span className="flyixo-story-number">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Top Accent */}
              <span className="flyixo-story-accent"></span>

              {/* User Information */}
              <div className="flyixo-user-info">
                <div className="flyixo-avatar-wrapper">
                  <span className="flyixo-avatar-ring"></span>

                  <img
                    src={story.img}
                    alt={story.name}
                    className="flyixo-user-avatar"
                    loading="lazy"
                  />
                </div>

                <div className="flyixo-user-details">
                  <p className="flyixo-user-name">
                    {story.name}
                  </p>

                  <p className="flyixo-user-location">
                    <span className="flyixo-location-dot"></span>

                    {story.locationFrom} to {story.locationTo}
                  </p>
                </div>
              </div>

              {/* Quote Icon */}
              <div className="flyixo-quote-icon">
                “
              </div>

              {/* Testimonial */}
              <p className="flyixo-testimonial">
                {story.testimonial}
              </p>

              {/* Rating */}
              <div
                className="flyixo-story-rating"
                aria-label="5 star rating"
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>

                <small>5.0</small>
              </div>

              {/* Bottom Row */}
              <div className="flyixo-story-bottom">
                <div className="flyixo-category">
                  {story.category}
                </div>

                <div className="flyixo-university-logo-box">
                  <img
                    src={story.uniLogo}
                    alt={`${story.name} university`}
                    className="flyixo-university-logo"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flyixo-story-footer">
                <span>
                  Flyixo Edu Experience
                </span>

                <span className="flyixo-story-arrow">
                  →
                </span>
              </div>

              {/* Decorative Corner */}
              <span className="flyixo-story-corner"></span>
            </article>
          ))}
        </div>

        {/* Bottom Trust */}
        <div className="flyixo-success-bottom">
          <span className="flyixo-bottom-line"></span>

          <p>
            Your success story could be next with{" "}
            <strong>Flyixo Edu.</strong>
          </p>

          <span className="flyixo-bottom-line"></span>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;