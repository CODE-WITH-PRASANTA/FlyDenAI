import React, { useState } from "react";
import "./LatestProjects.css";
import latest1 from "../../assets/latest1.webp";
import latest2 from "../../assets/latest2.webp";
import latest3 from "../../assets/latest3.webp";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const LatestProjects = () => {
  const projects = [
    { img: latest1, title: "Visa & Immigration", type: "Consultancy" },
    { img: latest2, title: "Tour & Travels", type: "Consultancy" },
    { img: latest3, title: "Student", type: "Consultancy" },
  ];

  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="latest-projects-section">
      {/* Left Section */}
      <div className="latest-projects-left">
        <h5 className="subtitle">LATEST PROJECTS</h5>
        <h2 className="main-title">Explore Our Latest Projects</h2>
        <p className="description">
          Check out our latest work in visa consulting, immigration services, and student guidance. Click the dots to view different projects.
        </p>

        <ul className="features-list">
          <li><FaCheckCircle className="check-icon" /> Visa Consulting</li>
          <li><FaCheckCircle className="check-icon" /> Immigration Consultancy</li>
          <li><FaCheckCircle className="check-icon" /> Student Guidance</li>
        </ul>

        <div className="dots-pagination">
          {projects.map((_, index) => (
            <span
              key={index}
              className={`dot ${activeProject === index ? "active" : ""}`}
              onClick={() => setActiveProject(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="latest-projects-right">
        {projects.map((item, index) => (
          <div
            key={index}
            className={`project-card ${activeProject === index ? "active-card" : "inactive-card"}`}
          >
            <div className="card-image">
              <img src={item.img} alt={item.title} />
              <div className="latestproject-overlay"></div>
            </div>
            <div className="card-info">
              <div>
                <span className="type">{item.type}</span>
                <h3>{item.title}</h3>
              </div>
              <button className="arrow-btn">
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestProjects;
