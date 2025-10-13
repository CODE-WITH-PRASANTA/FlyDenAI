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
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="herosection">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`herosection-slide ${index === current ? "active" : ""}`}
        >
          {/* === Slider 1: Study & Intern Abroad Focus === */}
          {slide.type === "image" && (
            <div
              className="herosection-bg styled-bg"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="overlay"></div>
              <div className="hero-content">
                <p className="hero-subtitle">
                  Explore <span className="highlight">Study</span> &{" "}
                  <span className="highlight">Intern Abroad</span> Opportunities
                </p>
                <h1 className="hero-title">
                  Build Your <span className="red-text">Global Career</span> With Ease
                </h1>

                <ul className="hero-bullets">
                  <li><span className="dot"></span> Apply to Top Global Universities</li>
                  <li><span className="dot"></span> Secure Paid Internships Abroad</li>
                  <li><span className="dot"></span> Full Visa Assistance & Guidance</li>
                </ul>

                <div className="hero-actions">
                  <button className="cta-btn shine">Start Application</button>
                  <a href="tel:+447403645364" className="call-btn shine">
                    📞 <span>+44 7403645364</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* === Slider 2: Visa Booking Focus === */}
          {slide.type === "split" && (
            <div
              className="herosection-bg styled-bg"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="overlay"></div>
              <div className="hero-content right-align">
                <p className="hero-subtitle animate-right">
                  Your Trusted Platform For{" "}
                  <span className="highlight">Study, Internship & Visa</span>
                </p>
                <h1 className="hero-title animate-right">
                  Quick & Reliable <br /> <span className="red-text">Visa Booking</span> Support
                </h1>

                <ul className="hero-bullets animate-right">
                  <li><span className="dot"></span> Simple Process, Fast Approval</li>
                  <li><span className="dot"></span> Expert Visa & Travel Support</li>
                  <li><span className="dot"></span> Apply With Confidence</li>
                </ul>

                <div className="hero-actions animate-right">
                  <a href="tel:+447403645364" className="call-btn shine">
                    📞 <span>+44 7403645364</span>
                  </a>
                  <button className="cta-btn shine">Book Visa Now</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot-btn ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
