import React, { useState, useEffect, useRef } from "react";
import "./CareerCarousel.css";

// Import your 8 images
import carousel1 from "../../assets/carousel1.webp";
import carousel2 from "../../assets/carousel2.webp";
import carousel3 from "../../assets/carousel3.webp";
import carousel4 from "../../assets/carousel4.webp";
import carousel5 from "../../assets/carousel5.webp";
import carousel6 from "../../assets/carousel6.webp";
import carousel7 from "../../assets/carousel7.webp";
import carousel8 from "../../assets/carousel8.webp";

const data = [
  { title: "Environmental Sciences", img: carousel1 },
  { title: "Health Sciences", img: carousel2 },
  { title: "Social Sciences", img: carousel3 },
  { title: "STEM", img: carousel4 },
  { title: "Trades & Technical Skills", img: carousel5 },
  { title: "Business & Management", img: carousel6 },
  { title: "Arts & Humanities", img: carousel7 },
  { title: "Technology & Innovation", img: carousel8 },
];

const CareerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const totalSlides = data.length;

  // Auto-slide every 3 seconds
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Number of visible cards
  const visibleCards = () => {
    if (window.innerWidth >= 1200) return 5;
    if (window.innerWidth >= 900) return 4;
    if (window.innerWidth >= 600) return 2;
    return 1;
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <h2 className="carousel-title">
        What career field do you want to gain experience in?
      </h2>

      <div className="carousel-wrapper">
        <button
          aria-label="Previous"
          className="nav-arrow left-arrow"
          onClick={prevSlide}
        >
          &#10094;
        </button>

        <div className="carousel-slider-wrapper">
          <div
            className="carousel-slider"
            ref={sliderRef}
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCards()}%)`,
              width: `${(totalSlides / visibleCards()) * 100}%`,
            }}
          >
            {data.map(({ title, img }, index) => (
              <div key={index} className="carousel-card">
                <div className="carousel-image">
                  <img src={img} alt={title} />
                </div>
                <div className="carousel-label">{title}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Next"
          className="nav-arrow right-arrow"
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>

      <button className="explore-btn">Explore all industries</button>
    </div>
  );
};

export default CareerCarousel;
