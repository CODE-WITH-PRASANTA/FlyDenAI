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
  return (
    <div className="CareerCarousel-container">
      <h2 className="CareerCarousel-title">
        What career field do you want to gain experience in?
      </h2>

      <div className="CareerCarousel-scroll-section">
        <div className="CareerCarousel-track">
          {data.map((item, index) => (
            <div className="CareerCarousel-card" key={index}>
              <div className="CareerCarousel-image">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="CareerCarousel-label">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="CareerCarousel-btn">Explore all industries</button>
    </div>
  );
};

export default CareerCarousel;
