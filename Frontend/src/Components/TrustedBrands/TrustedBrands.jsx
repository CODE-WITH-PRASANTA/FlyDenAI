import React from "react";
import "./TrustedBrands.css";
import logo from "../../assets/logo.webp";

const TrustedBrands = () => {
  const logos = Array(6).fill().map((_, index) => (
    <div key={index} className="logo">
      <img src={logo} alt="Brand Logo" />
      
    </div>
  ));

  return (
    <section className="trusted-brands">
      {/* Section Title */}
      <div className="trusted-title">1K+ BRANDS TRUST US</div>

      {/* Logos Infinite Slider */}
      <div className="logos-slider">
        <div className="logos-track">
          {logos}
          {logos} {/* duplicate logos for infinite scrolling */}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
