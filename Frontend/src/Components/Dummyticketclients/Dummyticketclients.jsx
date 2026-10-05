import React, { useEffect, useMemo, useState } from "react";
import "./Dummyticketclients.css";
import bgImage from "../../assets/nf-img.webp";

const testimonials = [
  {
    quote:
      "Flyixo provided my dummy ticket within minutes. Perfect format for my visa interview and accepted without any issue. Highly recommended!",
    name: "Ankit Sharma",
    designation: "Student Visa Applicant",
  },
  {
    quote:
      "Super fast service! I needed a dummy ticket for my Canada visa submission and Flyixo delivered it professionally and at the best price.",
    name: "Meera Patel",
    designation: "Visa Applicant",
  },
  {
    quote:
      "I was struggling to get a confirmed itinerary for my Schengen visa. Flyixo made it simple and stress-free. Their customer support is excellent!",
    name: "Rohit Agarwal",
    designation: "Business Traveller",
  },
  {
    quote:
      "My travel agent was charging too much for dummy tickets. Flyixo provided the same service at half the price with instant delivery.",
    name: "Priya Sahu",
    designation: "Tourist Visa Applicant",
  },
  {
    quote:
      "Trusted and reliable company! The dummy ticket looked authentic and exactly what the embassy required. Thank you Flyixo!",
    name: "Siddharth Rao",
    designation: "Frequent Traveler",
  },
  {
    quote:
      "Excellent service! I received my dummy ticket for US visa in just 3 minutes. Fastest service I have ever seen.",
    name: "Harpreet Singh",
    designation: "Software Engineer",
  },
  {
    quote:
      "Very professional team. They helped me with both flight and hotel dummy bookings required for my Spain visa. Smooth and affordable!",
    name: "Tanisha Kapoor",
    designation: "Travel Enthusiast",
  },
  {
    quote:
      "Flyixo's dummy ticket service is super reliable. The embassy accepted it without any questions. Will definitely use again for future trips.",
    name: "Abdul Rahman",
    designation: "Dubai Visa Applicant",
  },
  {
    quote:
      "I urgently needed a dummy ticket for an emergency visa appointment. Flyixo delivered within 2 minutes. Amazing speed!",
    name: "Karishma Jain",
    designation: "Student Traveler",
  },
  {
    quote:
      "Affordable pricing and very smooth process. Flyixo has become my go-to service for all visa-related travel documents.",
    name: "Arjun Mehta",
    designation: "Frequent Flyer",
  },
  {
    quote:
      "Highly recommend Flyixo — their dummy ticket quality is top-notch and embassy compliant. Very professional team!",
    name: "Nikki Dsouza",
    designation: "UK Visa Applicant",
  },
  {
    quote:
      "The best service for dummy tickets. I use Flyixo for all my client visa applications. Reliable and fast every single time.",
    name: "Thomas",
    designation: "Travel Consultant",
  },
];

const ClientsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  // ============================================================
  // RESPONSIVE SCREEN DETECTION
  // ============================================================

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);
      setCurrentSlide(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ============================================================
  // CREATE SLIDE GROUPS
  // ============================================================

  const slides = useMemo(() => {
    if (isMobile) {
      return testimonials.map((testimonial) => [testimonial]);
    }

    const result = [];

    for (let i = 0; i < testimonials.length; i += 2) {
      result.push(testimonials.slice(i, i + 2));
    }

    return result;
  }, [isMobile]);

  // ============================================================
  // AUTO SLIDER
  // ============================================================

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        return (prev + 1) % slides.length;
      });
    }, isMobile ? 5000 : 3500);

    return () => {
      clearInterval(interval);
    };
  }, [slides.length, isMobile]);

  // ============================================================
  // SLIDER NAVIGATION
  // ============================================================

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      return (prev + 1) % slides.length;
    });
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => {
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  };

  return (
    <section
      className="flyixo-client-section"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div className="flyixo-client-overlay"></div>

      <div className="flyixo-client-orb flyixo-client-orb-one"></div>
      <div className="flyixo-client-orb flyixo-client-orb-two"></div>

      <div className="flyixo-client-grid"></div>

      {/* ======================================================
          CONTAINER
      ======================================================= */}

      <div className="flyixo-client-container">

        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="flyixo-client-header">

          <div className="flyixo-client-badge">
            <span className="flyixo-client-badge-dot"></span>
            FLYIXO CLIENT EXPERIENCES
          </div>

          <h2 className="flyixo-client-heading">
            What Our{" "}
            <span>Clients Say</span>
          </h2>

          <p className="flyixo-client-subtext">
            5000+ Customers trust Flyixo for secure, quick and
            hassle-free visa travel documentation services.
          </p>

          <div className="flyixo-client-heading-line">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

        {/* ====================================================
            RATING SUMMARY
        ===================================================== */}

        <div className="flyixo-client-summary">

          <div className="flyixo-client-summary-rating">
            <strong>5.0</strong>

            <div className="flyixo-client-summary-stars">
              ★ ★ ★ ★ ★
            </div>
          </div>

          <div className="flyixo-client-summary-divider"></div>

          <div className="flyixo-client-summary-info">
            <strong>Trusted by thousands</strong>
            <span>Real experiences from Flyixo customers</span>
          </div>

        </div>

        {/* ====================================================
            SLIDER
        ===================================================== */}

        <div className="flyixo-client-slider-wrapper">

          {/* Navigation */}
          <button
            type="button"
            className="flyixo-client-nav flyixo-client-nav-prev"
            onClick={previousSlide}
            aria-label="Previous testimonials"
          >
            ←
          </button>

          <button
            type="button"
            className="flyixo-client-nav flyixo-client-nav-next"
            onClick={nextSlide}
            aria-label="Next testimonials"
          >
            →
          </button>

          <div className="flyixo-client-slider-track-wrapper">

            <div
              className="flyixo-client-slider-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >

              {slides.map((slideGroup, index) => (
                <div
                  className="flyixo-client-slide"
                  key={index}
                >

                  {slideGroup.map((item, cardIndex) => (
                    <article
                      className="flyixo-client-card"
                      key={`${item.name}-${cardIndex}`}
                    >

                      {/* Card Glow */}
                      <div className="flyixo-client-card-glow"></div>

                      {/* Quote Icon */}
                      <div className="flyixo-client-quote-icon">
                        “
                      </div>

                      {/* Verified */}
                      <div className="flyixo-client-verified">
                        <span>✓</span>
                        Verified Experience
                      </div>

                      {/* Quote */}
                      <p className="flyixo-client-quote">
                        {item.quote}
                      </p>

                      {/* Stars */}
                      <div className="flyixo-client-stars">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                      {/* Divider */}
                      <div className="flyixo-client-divider"></div>

                      {/* Profile */}
                      <div className="flyixo-client-profile">

                        <div className="flyixo-client-avatar">
                          {item.name.charAt(0)}
                        </div>

                        <div className="flyixo-client-profile-info">

                          <p className="flyixo-client-name">
                            {item.name}
                          </p>

                          <p className="flyixo-client-designation">
                            {item.designation}
                          </p>

                        </div>

                        <div className="flyixo-client-profile-check">
                          ✓
                        </div>

                      </div>

                      {/* Bottom Brand */}
                      <div className="flyixo-client-card-brand">
                        FLYIXO
                      </div>

                    </article>
                  ))}

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* ====================================================
            PAGINATION
        ===================================================== */}

        <div className="flyixo-client-pagination">

          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`flyixo-client-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial slide ${index + 1}`}
            />
          ))}

        </div>

        {/* ====================================================
            CTA
        ===================================================== */}

        <button
          type="button"
          className="flyixo-client-button"
          onClick={nextSlide}
        >
          <span>View All Experiences</span>
          <span className="flyixo-client-button-arrow">
            →
          </span>
        </button>

        {/* ====================================================
            BOTTOM TRUST
        ===================================================== */}

        <div className="flyixo-client-bottom">

          <span className="flyixo-client-bottom-line"></span>

          <p>
            Trusted service.
            <strong> Real experiences. </strong>
            Global journeys with
            <span> Flyixo.</span>
          </p>

          <span className="flyixo-client-bottom-line"></span>

        </div>

      </div>
    </section>
  );
};

export default ClientsSection;