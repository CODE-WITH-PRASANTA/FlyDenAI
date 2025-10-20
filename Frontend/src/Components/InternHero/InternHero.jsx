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
      className="InternHero-Container"
      style={{
        backgroundImage: `url(${internImg})`,
      }}
    >
      <div className="InternHero-Overlay"></div>

      <div className="InternHero-Content">
        <h1 className="InternHero-Title">Intern Abroad HQ</h1>
        <p className="InternHero-Subtitle">
          World's #1 rated global internship programs
        </p>

        <p className="InternHero-Rating">
          <span className="InternHero-RatingText">Excellent</span>{" "}
          <span className="InternHero-RatingValue">4.7 out of 5</span>{" "}
          <span className="InternHero-Trust">★ Trustpilot</span>
        </p>

        <div className="InternHero-SearchCard">
          <div className="InternHero-StatsRow">
            <div className="InternHero-StatItem">
              <FaSuitcase className="InternHero-StatIcon" />
              <span>346 programs</span>
            </div>
            <div className="InternHero-StatItem">
              <FaGlobeAmericas className="InternHero-StatIcon" />
              <span>25 countries</span>
            </div>
            <div className="InternHero-StatItem">
              <FaCalendarAlt className="InternHero-StatIcon" />
              <span>2 to 24 weeks</span>
            </div>
          </div>

          <div className="InternHero-SearchRow">
            <div className="InternHero-DropDown">
              <label>Select your career field or specialization</label>
              <select
                value={careerField}
                onChange={(e) => setCareerField(e.target.value)}
              >
                <option value="">
                  Click to choose the focus for your internship
                </option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT & Software</option>
              </select>
            </div>

            <div className="InternHero-TypeButtons">
              <label>What type of internship are you looking for?</label>
              <div className="InternHero-BtnGroup">
                {["Abroad", "Remote", "Any"].map((type) => (
                  <button
                    key={type}
                    className={`InternHero-TypeBtn ${
                      internType === type ? "active" : ""
                    }`}
                    onClick={() => setInternType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button className="InternHero-SearchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternHero;
