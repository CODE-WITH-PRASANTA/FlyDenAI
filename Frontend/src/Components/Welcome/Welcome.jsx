import React from "react";
import "./Welcome.css";

// Import your assets
import passportImg from "../../assets/single-img-1.png"; // background passport image
import travelerImg from "../../assets/single-img-2.webp"; // traveler PNG

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Left Side (Passport background) */}
      <div className="welcome-left-side">
        <img src={passportImg} alt="Passport" className="welcome-passport-bg" />
        {/* Traveler starts here and moves across */}
        <img src={travelerImg} alt="Traveler" className="welcome-traveler-move" />
      </div>

      {/* Right Side Content */}
      <div className="welcome-right-side">
        <h1 className="welcome-heading">
          Welcome to <span className="welcome-highlight">Immigration Advisory</span> Services
        </h1>
        <p className="welcome-description-text">
          Truvik immigration advisory foundation was established with a small
          idea that was incepted in the minds of its promoters in the year 1994!
          We skilfully guide applicants for immigration process to any country
          they aspire to settle down.
        </p>

        <ul className="welcome-benefits-list">
          <li className="welcome-benefit-item">
            <span className="welcome-check-icon">✓</span>
            The desire to blur the global boundaries fulfil
          </li>
          <li className="welcome-benefit-item">
            <span className="welcome-check-icon">✓</span>
            Certified legal advisors to serve you better way.
          </li>
          <li className="welcome-benefit-item">
            <span className="welcome-check-icon">✓</span>
            Easy approval by choosing top visa consultant
          </li>
        </ul>

        <button className="welcome-watch-video-btn">Watch The Video</button>
      </div>
    </div>
  );
};

export default Welcome;