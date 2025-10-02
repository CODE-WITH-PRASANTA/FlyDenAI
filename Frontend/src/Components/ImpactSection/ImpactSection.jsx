import React from "react";
import "./ImpactSection.css";
import b1 from "../../assets/b1.jpg"

const ImpactSection = () => {
  const data = [
    { title: "Immigration Consultant", percent: 85 },
    { title: "Study And Work Visa", percent: 74 },
    { title: "Business Visit Visa", percent: 65 },
  ];

  return (
    <section className="impact-section">
      <div className="impact-content">
        <h2 className="impact-title">
          The impact of <br /> our <span>Competitive</span> efforts
        </h2>
        <p className="impact-text">
          flation process to any country they aspire to settle. Foundation was
          established with a small idea that was incepted in the minds of its
          promotersguide.
        </p>

        <div className="progress-container">
          {data.map((item, index) => (
            <div className="progress-box" key={index}>
              <div className="progress-label">
                {item.title} <span>{item.percent}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="impact-image">
        <img src={b1} alt="Team working together" />
      </div>
    </section>
  );
};

export default ImpactSection;
