import React from "react";
import "./Welcome.css";

// Import your assets
import passportImg from "../../assets/single-img-1.png";
import travelerImg from "../../assets/single-img-2.webp";

const Welcome = () => {
  return (
    <section className="welcome-section">
      {/* Left Side: Passport + Traveler */}
      <div className="welcome-left">
        <img src={passportImg} alt="Passport" className="passport-bg" />
        <img src={travelerImg} alt="Traveler" className="traveler" />
      </div>

      {/* Right Side Content */}
      <div className="welcome-right">
        <h2 className="welcome-title">
          Welcome to <span className="highlight">FlyDenAI</span>
        </h2>
        <p className="welcome-text">
          Your trusted platform for <strong>Visa Booking</strong>, 
          <strong> Study Abroad</strong>, and <strong>Intern Abroad</strong> opportunities. 
          We simplify every step with expert guidance and smart tools for a seamless journey.
        </p>

        <ul className="benefits-list">
          <li>
            <span className="check">✓</span>
            Fast and reliable Visa Booking with real-time updates
          </li>
          <li>
            <span className="check">✓</span>
            Step-by-step guidance for Study Abroad programs
          </li>
          <li>
            <span className="check">✓</span>
            Access paid Intern Abroad opportunities worldwide
          </li>
          <li>
            <span className="check">✓</span>
            24/7 expert support for every application
          </li>
          <li>
            <span className="check">✓</span>
            Smart tracking system for fast approval and updates
          </li>
        </ul>

        {/* <button className="btn-primary">Watch How FlyDenAI Works</button> */}
      </div>
    </section>
  );
};

export default Welcome;
