import React, { useEffect, useState } from "react";
import "./Dummyticketfeature.css";

const features = [
  {
    title: "Secure Payment",
    icon: "🔒",
  },
  {
    title: "24x7 Support",
    icon: "👥",
  },
  {
    title: "5+ Years of Travel Expertise",
    icon: "🛡️",
  },
  {
    title: "Trusted Travel Partners",
    icon: "✈️",
  },
  {
    title: "Money-Back Guarantee",
    icon: "💰",
  },
];

const FeaturesStrip = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ============================================================
  // NEXT SLIDE
  // ============================================================

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === features.length - 1 ? 0 : prev + 1
    );
  };

  // ============================================================
  // PREVIOUS SLIDE
  // ============================================================

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? features.length - 1 : prev - 1
    );
  };

  // ============================================================
  // GO TO SPECIFIC SLIDE
  // ============================================================

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // ============================================================
  // AUTO SLIDER
  // ============================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === features.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flyixo-features-section">
      {/* ========================================================
          BACKGROUND DECORATIONS
      ======================================================== */}

      <div className="flyixo-features-bg flyixo-features-bg-one"></div>

      <div className="flyixo-features-bg flyixo-features-bg-two"></div>

      <div className="flyixo-features-grid"></div>

      {/* ========================================================
          SECTION HEADER
      ======================================================== */}

      <div className="flyixo-features-header">
        <div className="flyixo-features-eyebrow">
          <span className="flyixo-features-line"></span>

          <span>WHY CHOOSE FLYIXO</span>

          <span className="flyixo-features-line"></span>
        </div>

        <h2 className="flyixo-features-title">
          Travel With <span>Confidence</span>
        </h2>

        <p className="flyixo-features-description">
          Experience secure bookings, professional assistance and trusted
          travel services with Flyixo.
        </p>
      </div>

      {/* ========================================================
          DESKTOP FEATURE STRIP
      ======================================================== */}

      <div className="features-container">
        {features.map((item, index) => (
          <div
            className="feature-card"
            key={item.title}
          >
            {/* Card Number */}
            <span className="feature-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Top Accent */}
            <span className="feature-accent"></span>

            {/* Icon */}
            <div className="feature-icon-wrapper">
              <span className="feature-icon">
                {item.icon}
              </span>
            </div>

            {/* Content */}
            <div className="feature-content">
              <p className="feature-title">
                {item.title}
              </p>

              <div className="feature-brand">
                <span className="feature-check">
                  ✓
                </span>

                <span>Flyixo Advantage</span>
              </div>
            </div>

            {/* Hover Arrow */}
            <div className="feature-arrow">
              <span>✓</span>
            </div>

            {/* Decorative Corner */}
            <span className="feature-corner"></span>
          </div>
        ))}
      </div>

      {/* ========================================================
          MOBILE CAROUSEL
      ======================================================== */}

      <div className="carousel-container">
        <button
          type="button"
          className="carousel-btn prev"
          onClick={prevSlide}
          aria-label="Previous feature"
        >
          ‹
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-wrapper"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {features.map((item, index) => (
              <div
                className="carousel-slide"
                key={item.title}
              >
                <div className="feature-card">
                  {/* Number */}
                  <span className="feature-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Accent */}
                  <span className="feature-accent"></span>

                  {/* Icon */}
                  <div className="feature-icon-wrapper">
                    <span className="feature-icon">
                      {item.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="feature-content">
                    <p className="feature-title">
                      {item.title}
                    </p>

                    <div className="feature-brand">
                      <span className="feature-check">
                        ✓
                      </span>

                      <span>Flyixo Advantage</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="feature-arrow">
                    <span>✓</span>
                  </div>

                  {/* Corner */}
                  <span className="feature-corner"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-btn next"
          onClick={nextSlide}
          aria-label="Next feature"
        >
          ›
        </button>

        {/* ======================================================
            DOTS
        ====================================================== */}

        <div className="carousel-dots">
          {features.map((item, index) => (
            <button
              type="button"
              key={item.title}
              aria-label={`Go to feature ${index + 1}`}
              className={`carousel-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        {/* Mobile Brand */}
        <div className="carousel-brand">
          <span></span>

          <p>
            Powered by <strong>Flyixo</strong>
          </p>

          <span></span>
        </div>
      </div>
    </section>
  );
};

export default FeaturesStrip;