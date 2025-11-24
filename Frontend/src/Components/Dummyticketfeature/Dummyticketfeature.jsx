//// FeaturesStrip.jsx
import React, { useState, useEffect } from "react";
import "./Dummyticketfeature.css";

const features = [
  { title: "Secure Payment", icon: "🔒" },
  { title: "24x7 Support", icon: "👥" },
  { title: "5+ Years of Travel Expertise", icon: "🛡️" },
  { title: "Trusted Travel Partners", icon: "✈️" },
  { title: "Money-Back Guarantee", icon: "💰" },
];

const FeaturesStrip = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      {/* Desktop View - Original Layout */}
      <section className="features-container">
        {features.map((item) => (
          <div className="feature-card" key={item.title}>
            <div className="feature-icon-wrapper">
              <span className="feature-icon">{item.icon}</span>
            </div>
            <p className="feature-title">{item.title}</p>
          </div>
        ))}
      </section>

      {/* Mobile View - Carousel */}
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevSlide}>
          ‹
        </button>
        
        <div 
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {features.map((item, index) => (
            <div className="carousel-slide" key={item.title}>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{item.icon}</span>
                </div>
                <p className="feature-title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          ›
        </button>

        <div className="carousel-dots">
          {features.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturesStrip;