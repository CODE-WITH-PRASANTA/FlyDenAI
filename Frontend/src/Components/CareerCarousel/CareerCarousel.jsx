import React from "react";
import "./CareerCarousel.css";

import carousel1 from "../../assets/carousel1.webp";
import carousel2 from "../../assets/carousel2.webp";
import carousel3 from "../../assets/carousel3.webp";
import carousel4 from "../../assets/carousel4.webp";
import carousel5 from "../../assets/carousel5.webp";
import carousel6 from "../../assets/carousel6.webp";
import carousel7 from "../../assets/carousel7.webp";
import carousel8 from "../../assets/carousel8.webp";

const data = [
  {
    title: "Environmental Sciences",
    img: carousel1,
  },
  {
    title: "Health Sciences",
    img: carousel2,
  },
  {
    title: "Social Sciences",
    img: carousel3,
  },
  {
    title: "STEM",
    img: carousel4,
  },
  {
    title: "Trades & Technical Skills",
    img: carousel5,
  },
  {
    title: "Business & Management",
    img: carousel6,
  },
  {
    title: "Arts & Humanities",
    img: carousel7,
  },
  {
    title: "Technology & Innovation",
    img: carousel8,
  },
];

const CareerCarousel = () => {
  return (
    <section className="flyixo-career-section">

      {/* Background Decorations */}
      <div className="flyixo-career-bg flyixo-career-bg-one"></div>
      <div className="flyixo-career-bg flyixo-career-bg-two"></div>
      <div className="flyixo-career-grid"></div>

      <div className="flyixo-career-container">

        {/* ================= HEADER ================= */}
        <div className="flyixo-career-header">

          <div className="flyixo-career-eyebrow">
            <span className="flyixo-career-line"></span>
            <span>FLYIXO CAREER OPPORTUNITIES</span>
            <span className="flyixo-career-line"></span>
          </div>

          <h2 className="flyixo-career-title">
            What Career Field Do You Want
            <span> To Gain Experience In?</span>
          </h2>

          <p className="flyixo-career-description">
            Explore different career fields and discover international
            internship opportunities that can help you develop practical
            skills and build your global career.
          </p>

        </div>

        {/* ================= CAROUSEL ================= */}
        <div className="flyixo-career-scroll">

          <div className="flyixo-career-track">

            {data.map((item, index) => (
              <article
                className="flyixo-career-card"
                key={index}
              >

                {/* Card Number */}
                <div className="flyixo-career-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Image */}
                <div className="flyixo-career-image-wrapper">

                  <img
                    src={item.img}
                    alt={item.title}
                    className="flyixo-career-image"
                  />

                  <div className="flyixo-career-image-overlay"></div>

                  <span className="flyixo-career-image-brand">
                    FLYIXO
                  </span>

                </div>

                {/* Content */}
                <div className="flyixo-career-card-content">

                  <span className="flyixo-career-card-label">
                    CAREER FIELD
                  </span>

                  <h3>{item.title}</h3>

                  <div className="flyixo-career-card-footer">
                    <span>Explore opportunities</span>

                    <span className="flyixo-career-arrow">
                      →
                    </span>
                  </div>

                </div>

                {/* Decorative Corner */}
                <span className="flyixo-career-corner"></span>

              </article>
            ))}

          </div>

        </div>

        {/* ================= SCROLL HINT ================= */}
        <div className="flyixo-career-scroll-hint">
          <span className="flyixo-career-scroll-icon">←</span>
          <span>Scroll to explore career fields</span>
          <span className="flyixo-career-scroll-icon">→</span>
        </div>

        {/* ================= CTA ================= */}
        <div className="flyixo-career-cta">

          <div className="flyixo-career-cta-content">

            <span className="flyixo-career-cta-label">
              FIND YOUR DIRECTION
            </span>

            <h3>
              Ready To Explore Your Industry?
            </h3>

            <p>
              Choose a career field and start exploring global internship
              opportunities with Flyixo.
            </p>

          </div>

          <button
            type="button"
            className="flyixo-career-btn"
          >
            <span>Explore All Industries</span>
            <span className="flyixo-career-btn-arrow">
              →
            </span>
          </button>

        </div>

        {/* ================= BOTTOM BRAND ================= */}
        <div className="flyixo-career-bottom">

          <span></span>

          <p>
            Global opportunities. Career growth.{" "}
            <strong>Flyixo</strong>.
          </p>

          <span></span>

        </div>

      </div>
    </section>
  );
};

export default CareerCarousel;