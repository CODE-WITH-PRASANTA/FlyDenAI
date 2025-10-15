import React, { useState, useEffect } from "react";
import "./HeroSection.css";

import slider1 from "../../assets/slider1.webp";
import slider2 from "../../assets/slider2.webp";

const slides = [
  { id: 1, type: "image", img: slider1 },
  { id: 2, type: "split", img: slider2 },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
   <section className="hero-section">
  {slides.map((slide, index) => (
    <div
      key={slide.id}
      className={`hero-slide ${index === current ? "active" : ""}`}
      style={{ backgroundImage: `url(${slide.img})` }}
    >
      <div className="overlay"></div>

      {/* Slide Type 1: Image */}
      {slide.type === "image" && (
        <div className="hero-content left">
          <p className="hero-subtitle">
            Explore <span>Study</span> & <span>Intern Abroad</span> Opportunities
          </p>
          <h1>
            Build Your <span className="highlight">Global Career</span> With Ease
          </h1>
          <ul>
            <li>🌍 Apply to Top Global Universities</li>
            <li>💼 Secure Paid Internships Abroad</li>
            <li>🎓 Full Visa Assistance & Guidance</li>
          </ul>

          <div className="hero-buttons">
            <button className="hero-btn hero-btn-primary">
              Start Application
            </button>
            <a href="tel:+447403645364" className="hero-btn hero-btn-secondary">
              📞 +44 7403645364
            </a>
          </div>
        </div>
      )}

      {/* Slide Type 2: Split */}
      {slide.type === "split" && (
        <div className="hero-content right">
          <p className="hero-subtitle">
            Your Trusted Partner for <span>Study</span>, <span>Internship</span> &{" "}
            <span>Visa</span>
          </p>
          <h1>
            Quick & Reliable <span className="highlight">Visa Booking</span> Support
          </h1>
          <ul>
            <li>✅ Simple Process, Fast Approval</li>
            <li>🧳 Expert Visa & Travel Support</li>
            <li>💡 Apply With Confidence</li>
          </ul>

          <div className="hero-buttons">
            <a href="tel:+447403645364" className="hero-btn hero-btn-secondary">
              📞 +44 7403645364
            </a>
            <button className="hero-btn hero-btn-primary">
              Book Visa Now
            </button>
          </div>
        </div>
      )}
    </div>
  ))}

  {/* Navigation Arrows */}
  <button className="arrow left" onClick={prevSlide}>❮</button>
  <button className="arrow right" onClick={nextSlide}>❯</button>

  {/* Dots */}
  <div className="dots">
    {slides.map((_, idx) => (
      <span
        key={idx}
        className={`dot ${idx === current ? "active" : ""}`}
        onClick={() => setCurrent(idx)}
      ></span>
    ))}
  </div>
</section>

  );
};

export default HeroSection;
