import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Api";

import slider1 from "../../assets/slider1.webp";
import slider2 from "../../assets/slider2.webp";

const slides = [
  {
    id: 1,
    type: "image",
    img: slider1,
  },
  {
    id: 2,
    type: "split",
    img: slider2,
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ============================================================
  // FETCH CONTACT DATA
  // ============================================================

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/contacts`);

        const contactData = res.data?.data || [];

        const publishedContact = contactData.find(
          (item) => item.published === true
        );

        setContact(publishedContact || contactData[0] || null);
      } catch (error) {
        console.error("Error fetching Flyixo contact:", error);
        setContact(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  // ============================================================
  // AUTO SLIDER
  // ============================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // ============================================================
  // SLIDER CONTROLS
  // ============================================================

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // ============================================================
  // PHONE NUMBER
  // ============================================================

  const phoneNumber = contact?.phone
    ? String(contact.phone).replace(/[^\d+]/g, "")
    : "";

  // ============================================================
  // WHATSAPP NUMBER
  // ============================================================

  const whatsappNumber = contact?.whatsapp
    ? String(contact.whatsapp).replace(/[^\d]/g, "")
    : "";

  return (
    <section className="flyixo-hero-section">

      {/* ========================================================
          BACKGROUND DECORATIONS
      ========================================================= */}

      <div className="flyixo-hero-glow flyixo-hero-glow-one"></div>
      <div className="flyixo-hero-glow flyixo-hero-glow-two"></div>
      <div className="flyixo-hero-grid"></div>

      {/* ========================================================
          SLIDES
      ========================================================= */}

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`flyixo-hero-slide ${
            index === current ? "active" : ""
          }`}
          style={{
            backgroundImage: `url(${slide.img})`,
          }}
        >
          {/* Background Overlay */}
          <div className="flyixo-hero-overlay"></div>

          {/* Image Gradient */}
          <div className="flyixo-hero-image-gradient"></div>

          {/* ==================================================
              SLIDE 1
          ================================================== */}

          {slide.type === "image" && (
            <div className="flyixo-hero-content flyixo-hero-left">

              <div className="flyixo-hero-badge">
                <span className="flyixo-hero-badge-dot"></span>
                FLYIXO GLOBAL OPPORTUNITIES
              </div>

              <p className="flyixo-hero-subtitle">
                Explore <span>Study</span> &{" "}
                <span>Intern Abroad</span> Opportunities
              </p>

              <h1 className="flyixo-hero-title">
                Build Your{" "}
                <span className="flyixo-hero-highlight">
                  Global Career
                </span>{" "}
                With Ease
              </h1>

              <p className="flyixo-hero-description">
                Turn your international dreams into reality with
                professional guidance, university assistance,
                internship opportunities, and complete visa support.
              </p>

              <ul className="flyixo-hero-list">
                <li>
                  <span className="flyixo-hero-list-icon">🌍</span>
                  <span>Apply to Top Global Universities</span>
                </li>

                <li>
                  <span className="flyixo-hero-list-icon">💼</span>
                  <span>Secure Paid Internships Abroad</span>
                </li>

                <li>
                  <span className="flyixo-hero-list-icon">🎓</span>
                  <span>Full Visa Assistance & Guidance</span>
                </li>
              </ul>

              <div className="flyixo-hero-buttons">

                <button
                  type="button"
                  className="flyixo-hero-btn flyixo-hero-btn-primary"
                  onClick={() => navigate("/StudyAbroad")}
                >
                  <span>Start Application</span>
                  <span className="flyixo-hero-btn-arrow">
                    →
                  </span>
                </button>

                {!loading && contact ? (
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flyixo-hero-btn flyixo-hero-btn-secondary"
                  >
                    <span className="flyixo-hero-btn-icon">
                      📞
                    </span>

                    <span>
                      +91 {contact.phone}
                    </span>
                  </a>
                ) : (
                  <span className="flyixo-hero-btn flyixo-hero-btn-secondary flyixo-hero-btn-disabled">
                    Loading...
                  </span>
                )}

              </div>

              <div className="flyixo-hero-trust">
                <span className="flyixo-hero-trust-check">
                  ✓
                </span>

                <span>
                  Trusted guidance for your global journey
                </span>
              </div>

            </div>
          )}

          {/* ==================================================
              SLIDE 2
          ================================================== */}

          {slide.type === "split" && (
            <div className="flyixo-hero-content flyixo-hero-right">

              <div className="flyixo-hero-badge">
                <span className="flyixo-hero-badge-dot"></span>
                FLYIXO VISA SERVICES
              </div>

              <p className="flyixo-hero-subtitle">
                Your Trusted Partner for{" "}
                <span>Study</span>,{" "}
                <span>Internship</span> &{" "}
                <span>Visa</span>
              </p>

              <h1 className="flyixo-hero-title">
                Quick & Reliable{" "}
                <span className="flyixo-hero-highlight">
                  Visa Booking
                </span>{" "}
                Support
              </h1>

              <p className="flyixo-hero-description">
                Get professional assistance for your visa journey
                with a simple process, expert support, and reliable
                travel documentation services.
              </p>

              <ul className="flyixo-hero-list">
                <li>
                  <span className="flyixo-hero-list-icon">
                    ✓
                  </span>

                  <span>
                    Simple Process, Fast Approval
                  </span>
                </li>

                <li>
                  <span className="flyixo-hero-list-icon">
                    🧳
                  </span>

                  <span>
                    Expert Visa & Travel Support
                  </span>
                </li>

                <li>
                  <span className="flyixo-hero-list-icon">
                    💡
                  </span>

                  <span>
                    Apply With Confidence
                  </span>
                </li>
              </ul>

              <div className="flyixo-hero-buttons">

                {!loading && contact ? (
                  <>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="flyixo-hero-btn flyixo-hero-btn-secondary"
                    >
                      <span className="flyixo-hero-btn-icon">
                        📞
                      </span>

                      <span>
                        +91 {contact.phone}
                      </span>
                    </a>

                    {whatsappNumber && (
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flyixo-hero-btn flyixo-hero-btn-whatsapp"
                      >
                        <span className="flyixo-hero-btn-icon">
                          💬
                        </span>

                        <span>
                          Chat on WhatsApp
                        </span>
                      </a>
                    )}
                  </>
                ) : (
                  <span className="flyixo-hero-btn flyixo-hero-btn-secondary flyixo-hero-btn-disabled">
                    Loading...
                  </span>
                )}

                <button
                  type="button"
                  className="flyixo-hero-btn flyixo-hero-btn-primary"
                  onClick={() => navigate("/AllCountry")}
                >
                  <span>Book Visa Now</span>

                  <span className="flyixo-hero-btn-arrow">
                    →
                  </span>
                </button>

              </div>

              <div className="flyixo-hero-trust">
                <span className="flyixo-hero-trust-check">
                  ✓
                </span>

                <span>
                  Professional support from application to approval
                </span>
              </div>

            </div>
          )}
        </div>
      ))}

      {/* ========================================================
          PREVIOUS BUTTON
      ========================================================= */}

      <button
        type="button"
        className="flyixo-hero-arrow flyixo-hero-arrow-left"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <span>‹</span>
      </button>

      {/* ========================================================
          NEXT BUTTON
      ========================================================= */}

      <button
        type="button"
        className="flyixo-hero-arrow flyixo-hero-arrow-right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <span>›</span>
      </button>

      {/* ========================================================
          SLIDE INDICATORS
      ========================================================= */}

      <div className="flyixo-hero-dots">

        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`flyixo-hero-dot ${
              index === current ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

      </div>

      {/* ========================================================
          SLIDE COUNTER
      ========================================================= */}

      <div className="flyixo-hero-counter">
        <span>
          0{current + 1}
        </span>

        <div className="flyixo-hero-counter-line">
          <span
            style={{
              width: `${((current + 1) / slides.length) * 100}%`,
            }}
          ></span>
        </div>

        <span>
          0{slides.length}
        </span>
      </div>

    </section>
  );
};

export default HeroSection;