import React from "react";
import "./LogoSlider.css";

import c1 from "../../assets/c1.webp";
import c2 from "../../assets/c2.webp";
import c3 from "../../assets/c3.webp";
import c4 from "../../assets/c4.webp";
import c5 from "../../assets/c5.webp";
import c6 from "../../assets/c6.webp";

const logos = [c1, c2, c3, c4, c5, c6];

const LogoSlider = () => {
  return (
    <section className="logo-section">
      {/* Background Decorations */}
      <div className="logo-bg-circle logo-bg-circle-one"></div>
      <div className="logo-bg-circle logo-bg-circle-two"></div>

      {/* Heading */}
      <div className="logo-heading-wrapper">
        <span className="logo-eyebrow">OUR NETWORK</span>

        <h2 className="logo-heading">
          Trusted By{" "}
          <span>Our Partners</span>
        </h2>

        <div className="logo-heading-line">
          <span></span>
          <i></i>
          <span></span>
        </div>
      </div>

      {/* Slider */}
      <div className="logo-slider">
        {/* Left Fade */}
        <div className="logo-slider-fade logo-slider-fade-left"></div>

        {/* Moving Track */}
        <div className="logo-track">
          {[...logos, ...logos].map((logo, index) => (
            <div
              className={`logo-item logoslider-${(index % logos.length) + 1}`}
              key={`${index}-${logo}`}
            >
              <div className="logo-card">
                <img
                  src={logo}
                  alt={`Partner logo ${(index % logos.length) + 1}`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Fade */}
        <div className="logo-slider-fade logo-slider-fade-right"></div>
      </div>
    </section>
  );
};

export default LogoSlider;