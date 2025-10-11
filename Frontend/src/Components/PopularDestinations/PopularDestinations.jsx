import React, { useRef, useEffect, useState } from "react";
import "./PopularDestinations.css";

import i1 from "../../assets/01.webp";
import i2 from "../../assets/02.webp";
import i3 from "../../assets/03.webp";
import i4 from "../../assets/04.webp";
import i5 from "../../assets/05.webp";
import i6 from "../../assets/06.webp";

const destinations = [
  { name: "Dubai", continent: "Asia", price: "₹ 2,499/-", duration: "Processing Time: 2 Days", description: "Discover the luxury, stunning skyline, and world-class attractions in Dubai.", image: i6 },
  { name: "Malaysia", continent: "Asia", price: "₹ 1,999/-", duration: "Processing Time: 2 Days", description: "Experience tropical nature, vibrant culture, and amazing street food.", image: i2 },
  { name: "Singapore", continent: "Asia", price: "₹ 1,900/-", duration: "Processing Time: 2 Days", description: "A futuristic city with clean streets, iconic architecture, and endless fun.", image: i3 },
  { name: "Srilanka", continent: "Asia", price: "₹ 1,999/-", duration: "Processing Time: 3 Days", description: "Explore beautiful beaches, wildlife, and ancient cultural treasures.", image: i4 },
  { name: "Thailand", continent: "Asia", price: "₹ 1,999/-", duration: "Processing Time: 2 Days", description: "A mix of tropical beaches, flavorful cuisine, and exciting nightlife.", image: i5 },
  { name: "Australia", continent: "Australia", price: "₹ 9,999/-", duration: "Processing Time: 5 Days", description: "Adventure, wildlife, and modern cities await in the land Down Under.", image: i1 },
];

const PopularDestinations = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;

    const scroll = () => {
      if (!slider) return;

      if (!isDragging) {
        slider.scrollLeft += 0.5; // Adjust speed
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0; // seamless loop
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  return (
    <section className="popular-destinations">
      <h2 className="destinations-title">✈️ Popular Visa Destinations</h2>

      <div
        className="slider-wrapper"
        ref={sliderRef}
        onMouseEnter={() => setIsDragging(true)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {[...destinations, ...destinations].map((dest, index) => (
          <div key={index} className="destination-card">
            <div className="destination-image">
              <img src={dest.image} alt={dest.name} />
              <div className="price-tag">
                BOOKING<br />
                {dest.price}<br />
                ONLY
              </div>
            </div>
            <div className="destination-info">
              <h3>{dest.name}</h3>
              <p className="continent">{dest.continent}</p>
              <p className="duration">{dest.duration}</p>
              <p className="description">{dest.description}</p>
              <button className="explore-btn">Explore Now →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
