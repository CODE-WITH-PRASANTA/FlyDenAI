import React, { useState } from "react";
import "./InternHero.css";
import {
  FaGlobeAmericas,
  FaSuitcase,
  FaCalendarAlt,
  FaSearch,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
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
    <section className="intern-hero">
      {/* Background */}
      <div className="intern-hero__background">
        <div className="intern-hero__overlay"></div>
        <div className="intern-hero__glow intern-hero__glow--one"></div>
        <div className="intern-hero__glow intern-hero__glow--two"></div>
        <div className="intern-hero__grid"></div>
      </div>

      {/* Floating Decorations */}
      <div className="intern-hero__shape intern-hero__shape--one"></div>
      <div className="intern-hero__shape intern-hero__shape--two"></div>
      <div className="intern-hero__shape intern-hero__shape--three"></div>

      <div className="intern-hero__container">
        {/* Main Content */}
        <div className="intern-hero__content">

          {/* Eyebrow */}
          <div className="intern-hero__eyebrow">
            <span className="intern-hero__eyebrow-line"></span>

            <FaGlobeAmericas />

            <span>FLYIXO GLOBAL INTERNSHIPS</span>

            <span className="intern-hero__eyebrow-line"></span>
          </div>

          {/* Heading */}
          <h1 className="intern-hero__title">
            Build Your Career
            <span> Beyond Borders</span>
          </h1>

          {/* Subtitle */}
          <p className="intern-hero__subtitle">
            Explore world-class international internship opportunities and
            gain real-world experience that takes your career to the next level.
          </p>

          {/* Rating */}
          <div className="intern-hero__rating">
            <div className="intern-hero__rating-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <span className="intern-hero__rating-excellent">
              Excellent
            </span>

            <span className="intern-hero__rating-value">
              4.7 out of 5
            </span>

            <span className="intern-hero__rating-trust">
              ★ Trustpilot
            </span>
          </div>

          {/* Search Card */}
          <div className="intern-hero__search-card">

            {/* Search Card Header */}
            <div className="intern-hero__card-header">
              <div>
                <span className="intern-hero__card-label">
                  FIND YOUR OPPORTUNITY
                </span>

                <h2>Search Internship Programs</h2>
              </div>

              <div className="intern-hero__card-icon">
                <FaSearch />
              </div>
            </div>

            {/* Stats */}
            <div className="intern-hero__stats">

              <div className="intern-hero__stat">
                <div className="intern-hero__stat-icon">
                  <FaSuitcase />
                </div>

                <div className="intern-hero__stat-content">
                  <strong>346</strong>
                  <span>Programs</span>
                </div>
              </div>

              <div className="intern-hero__stat-divider"></div>

              <div className="intern-hero__stat">
                <div className="intern-hero__stat-icon">
                  <FaGlobeAmericas />
                </div>

                <div className="intern-hero__stat-content">
                  <strong>25</strong>
                  <span>Countries</span>
                </div>
              </div>

              <div className="intern-hero__stat-divider"></div>

              <div className="intern-hero__stat">
                <div className="intern-hero__stat-icon">
                  <FaCalendarAlt />
                </div>

                <div className="intern-hero__stat-content">
                  <strong>2–24</strong>
                  <span>Weeks</span>
                </div>
              </div>

            </div>

            {/* Search Form */}
            <div className="intern-hero__search-row">

              {/* Career Field */}
              <div className="intern-hero__field">
                <label htmlFor="career-field">
                  Select Your Career Field
                </label>

                <div className="intern-hero__select-wrapper">
                  <select
                    id="career-field"
                    value={careerField}
                    onChange={(e) => setCareerField(e.target.value)}
                  >
                    <option value="">
                      Choose your internship focus
                    </option>

                    <option value="Business">
                      Business
                    </option>

                    <option value="Marketing">
                      Marketing
                    </option>

                    <option value="Engineering">
                      Engineering
                    </option>

                    <option value="Design">
                      Design
                    </option>

                    <option value="Finance">
                      Finance
                    </option>

                    <option value="IT">
                      IT & Software
                    </option>
                  </select>
                </div>
              </div>

              {/* Internship Type */}
              <div className="intern-hero__field intern-hero__type-field">
                <label>
                  What Type Of Internship?
                </label>

                <div className="intern-hero__type-buttons">
                  {["Abroad", "Remote", "Any"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`intern-hero__type-button ${
                        internType === type ? "active" : ""
                      }`}
                      onClick={() => setInternType(type)}
                    >
                      {internType === type && (
                        <FaCheckCircle />
                      )}

                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <button
                type="button"
                className="intern-hero__search-button"
                onClick={handleSearch}
              >
                <span>Search</span>
                <FaArrowRight />
              </button>
            </div>

            {/* Bottom Trust */}
            <div className="intern-hero__card-footer">
              <div className="intern-hero__trust-item">
                <FaCheckCircle />
                <span>Verified Programs</span>
              </div>

              <div className="intern-hero__trust-item">
                <FaCheckCircle />
                <span>Global Opportunities</span>
              </div>

              <div className="intern-hero__trust-item">
                <FaCheckCircle />
                <span>Expert Guidance</span>
              </div>
            </div>

          </div>

          {/* Bottom Brand */}
          <div className="intern-hero__bottom">
            <span></span>

            <p>
              Your global career journey starts with{" "}
              <strong>Flyixo</strong>
            </p>

            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternHero;