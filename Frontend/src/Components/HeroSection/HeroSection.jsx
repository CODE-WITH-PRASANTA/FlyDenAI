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
          {/* === Slider 1 (Background with text) === */}
          {slide.type === "image" && (
            <div
              className="herosection-bg styled-bg"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="overlay"></div>
              <div className="hero-content">
                <p className="hero-subtitle">
                  Grab the <span className="highlight">Golden Opportunity</span> to
                </p>
                <h1 className="hero-title">
                  Study In <span className="red-text">Abroad</span> <br />
                  Universities
                </h1>

                <ul className="hero-bullets">
                  <li><span className="dot"></span> With Exam score 5.5 can apply</li>
                  <li><span className="dot"></span> Student with UG/PG</li>
                </ul>

                <div className="hero-actions">
                    <button className="cta-btn shine">Pay Fee After Visa</button>
                    <button className="call-btn shine">
                      📞 <span>+000 723 123 21</span>
                    </button>
                  </div>

              </div>
            </div>
          )}

          {/* === Slider 2 (Split layout) === */}
       {slide.type === "split" && (
          <div
            className="herosection-bg styled-bg"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="overlay"></div>
            <div className="hero-content right-align">
              <p className="hero-subtitle animate-right">
                Simple steps to your <span className="highlight">Dream Destination!</span>
              </p>
              <h1 className="hero-title animate-right">
                Start Planning <br /> Your <span className="red-text">#NextTrip!</span>
              </h1>

              <ul className="hero-bullets animate-right">
                <li><span className="dot"></span> Quick & Easy Process</li>
                <li><span className="dot"></span> Expert Guidance</li>
                <li><span className="dot"></span> Apply With Confidence</li>
              </ul>

              <div className="hero-actions animate-right">
                <button className="call-btn shine">
                  📞 <span>+000 723 123 21</span>
                </button>
                <button className="cta-btn shine">Apply Visa Today!</button>
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