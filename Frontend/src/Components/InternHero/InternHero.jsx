import React, { useState } from "react";
import "./InternHero.css";
import { FaGlobeAmericas, FaSuitcase, FaCalendarAlt } from "react-icons/fa";
import internImg from "../../assets/intern.webp";

const InternHero = () => {
  const [careerField, setCareerField] = useState("");
  const [internType, setInternType] = useState("Abroad");

  const handleSearch = () => {
    console.log("Selected career:", careerField || "Not selected");
    console.log("Internship type:", internType);
    alert(
      `Searching for ${internType} internships ${
        careerField ? "in " + careerField : ""
      }`
    );
  };

  return (
    <div
      className="intern-hero"
      style={{
        backgroundImage: `url(${internImg})`,
      }}
    >
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">Intern Abroad HQ</h1>
        <p className="hero-subtitle">
          World's #1 rated global internship programs
        </p>
        <p className="hero-rating">
          <span className="rating-text">Excellent</span>{" "}
          <span className="rating-value">4.7 out of 5</span>{" "}
          <span className="trust">★ Trustpilot</span>
        </p>

        <div className="search-card">
          <div className="stats-row">
            <div className="stat-item">
              <FaSuitcase className="stat-icon" />
              <span>346 programs</span>
            </div>
            <div className="stat-item">
              <FaGlobeAmericas className="stat-icon" />
              <span>25 countries</span>
            </div>
            <div className="stat-item">
              <FaCalendarAlt className="stat-icon" />
              <span>2 to 24 weeks</span>
            </div>
          </div>

          <div className="search-row">
            {/* ===== Dropdown ===== */}
            <div className="dropdown">
              <label>Select your career field or specialization</label>
              <select
                value={careerField}
                onChange={(e) => setCareerField(e.target.value)}
              >
                <option value="">Click to choose the focus for your internship</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT & Software</option>
              </select>
            </div>

            {/* ===== Type Buttons ===== */}
            <div className="type-buttons">
              <label>What type of internship are you looking for?</label>
              <div className="btn-group">
                {["Abroad", "Remote", "Any"].map((type) => (
                  <button
                    key={type}
                    className={`type-btn ${
                      internType === type ? "active" : ""
                    }`}
                    onClick={() => setInternType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* ===== Search Button ===== */}
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternHero;
