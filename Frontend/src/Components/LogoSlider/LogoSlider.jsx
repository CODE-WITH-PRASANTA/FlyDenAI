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
      <h2 className="logo-heading">
        Trusted By <span>Our Partners</span>
      </h2>
      <div className="logo-slider">
        <div className="logo-track">
          {logos.concat(logos).map((logo, index) => (
            <div className="logo-item" key={index}>
              <img src={logo} alt={`logo-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;