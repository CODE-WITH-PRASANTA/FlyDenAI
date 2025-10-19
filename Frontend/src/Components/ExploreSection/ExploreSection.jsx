import React, { useState } from "react";
import "./ExploreSection.css";
import videoThumb from "../../assets/internvideo.webp"; // your image

const ExploreSection = () => {
  const [active, setActive] = useState("University students");

  const options = [
    "University students",
    "High school students",
    "Gap years",
    "Career Changers",
  ];

  return (
    <div className="explore-wrapper">
      {/* ======= TOP SECTION ======= */}
      <section className="explore-top">
        <h2 className="explore-heading">Explore our best options for:</h2>
        <div className="explore-buttons">
          {options.map((opt) => (
            <button
              key={opt}
              className={active === opt ? "active" : ""}
              onClick={() => setActive(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* ======= BOTTOM SECTION ======= */}
      <section className="explore-bottom">
        <h2 className="explore-subtitle">
          Boost your resume & gain practical international career experience
        </h2>

        <div className="video-container">
          <img src={videoThumb} alt="Internship" className="video-thumbnail" />
          <div className="play-overlay">
            <div className="play-circle">
              <div className="play-icon">&#9658;</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreSection;
