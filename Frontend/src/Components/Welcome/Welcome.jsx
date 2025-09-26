import React from "react";
import "./Welcome.css";

// Import your assets
import passportImg from "../../assets/single-img-1.png"; // background passport image
import travelerImg from "../../assets/single-img-2.webp"; // traveler PNG

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Left Side (Passport background) */}
      <div className="left-side">
        <img src={passportImg} alt="Passport" className="bg-passport" />
        {/* Traveler starts here and moves across */}
        <img src={travelerImg} alt="Traveler" className="traveler-move" />
      </div>

      {/* Right Side Content */}
      <div className="right-side">
        <h1 className="welcome-title">
          Welcome to <span>Immigration Advisory</span> Services
        </h1>
        <p className="welcome-description">
          Truvik immigration advisory foundation was established with a small
          idea that was incepted in the minds of its promoters in the year 1994!
          We skilfully guide applicants for immigration process to any country
          they aspire to settle down.
        </p>

        <ul className="welcome-points">
          <li>
            <span className="check-icon">✓</span>
            The desire to blur the global boundaries fulfil
          </li>
          <li>
            <span className="check-icon">✓</span>
            Certified legal advisors to serve you better way.
          </li>
          <li>
            <span className="check-icon">✓</span>
            Easy approval by choosing top visa consultant
          </li>
        </ul>

        <button className="watch-video-btn">Watch The Video</button>
      </div>
    </div>
  );
};

export default Welcome;
