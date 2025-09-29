import React from "react";
import "./AboutAgency.css";
import { FaPassport, FaRegClock } from "react-icons/fa";
import i1 from "../../assets/col-bgimage-12.jpg";
import i2 from "../../assets/col-bgimage-12.jpg"; // use another image for small section if needed

const AboutAgency = () => {
  return (
    <section className="aboutagency-section">
      <div className="aboutagency-container">
        {/* Left Image */}
        <div className="aboutagency-image-wrapper">
          <img src={i1} alt="Travelers" className="aboutagency-main-image" />
          <p className="aboutagency-welcome">
            Welcome to <span>Immigration Advisory</span> services!
          </p>
        </div>

        {/* Right Content */}
        <div className="aboutagency-content">
          <p className="aboutagency-subtitle">ABOUT AGENCY</p>
          <h2 className="aboutagency-title">
            Your favorite <span className="highlight-red">Country</span> to apply{" "}
            <span className="highlight-red">Visa</span> immigration
          </h2>
          <p className="aboutagency-description">
            For the last 35 years, We have helped students, business persons,
            tourists, clients with medical needs to acquire U.S.
          </p>

          {/* Features */}
          <div className="aboutagency-features">
            <div className="aboutagency-feature">
              <div className="aboutagency-icon red-bg">
                <FaPassport />
              </div>
              <div>
                <h4>Online Visa</h4>
                <p>Lorem ium contary, incidi duntore donet</p>
              </div>
            </div>

            <div className="aboutagency-feature">
              <div className="aboutagency-icon light-bg">
                <FaRegClock />
              </div>
              <div>
                <h4>No More Times</h4>
                <p>Lorem ium contary, incidi duntore donet</p>
              </div>
            </div>
          </div>

          {/* Small Image with text */}
          <div className="aboutagency-small">
            <img src={i2} alt="Counselling" />
            <p>
              We’ve been counselling students for educational in foreign
              countries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAgency;
