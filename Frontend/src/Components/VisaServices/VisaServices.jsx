import React from "react";
import "./VisaServices.css";
import { FaCheck } from "react-icons/fa";

import i1 from "../../assets/col-bgimage-12.jpg";

const visaServices = [
  {
    title: "Job Visa",
    description: "Visa that grants the holder authorization to work abroad.",
    image: i1,
  },
  {
    title: "Business Visa",
    description: "Intended for individuals entering a country for business.",
    image: i1,
  },
  {
    title: "Student Visa",
    description: "For students entering a country for higher education.",
    image: i1,
  },
  {
    title: "Free Visa Enquiry",
    description: "Quick assessment and guidance for your visa questions.",
    image: i1,
  },
];

const needs = [
  "Resident visa to a new passport",
  "Variation of your resident visa",
  "Transfer permanent resident visa",
];

const VisaServices = () => {
  return (
    <section className="vs-section">
      <div className="vs-container">

        {/* Row 1 */}
        <div className="vs-row">
          <div className="vs-bigbox">
            <h4 className="vs-header">CHOOSE YOUR VISA</h4>
            <h2 className="vs-bigtitle">
              Immigration Services <span>Experienced</span>
            </h2>
            <p className="vs-bigdesc">
              Your trusted visa & immigration partner for work, study and travel abroad.
            </p>
          </div>

          {visaServices.slice(0, 2).map((service, index) => (
            <article key={index} className="vs-card">
              <img src={service.image} alt={service.title} />
              <div className="vs-overlay">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Row 2 */}
        <div className="vs-row">
          {visaServices.slice(2).map((service, index) => (
            <article key={index} className="vs-card">
              <img src={service.image} alt={service.title} />
              <div className="vs-overlay">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}

          <div className="vs-info">
            <h3 className="vs-infotitle">What you need?</h3>
            <ul className="vs-list">
              {needs.map((need, index) => (
                <li key={index}>
                  <FaCheck /> {need}
                </li>
              ))}
            </ul>
            <button className="vs-btn">Explore More</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisaServices;
