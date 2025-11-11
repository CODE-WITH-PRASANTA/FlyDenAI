import React from "react";
import "./VisaServices.css";
import { FaCheck } from "react-icons/fa";

import Jobvisa from '../../assets/job-visa.webp'
import BusinessVisa from '../../assets/business visa.webp'
import StudentVisa from '../../assets/student-visa.webp'
import Freevisa from '../../assets/free-visa.webp'

const visaServices = [
  {
    title: "Job Visa",
    description:
      "Secure employment opportunities abroad with a Job Visa. This visa allows skilled professionals to legally work, earn, and build their careers in international companies with ease.",
    image: Jobvisa,
  },
  {
    title: "Business Visa",
    description:
      "Expand your horizons with a Business Visa. Perfect for entrepreneurs, investors, and professionals attending meetings, conferences, or exploring trade opportunities overseas.",
    image: BusinessVisa,
  },
  {
    title: "Student Visa",
    description:
      "Shape your future with a Student Visa. Designed for learners pursuing higher education in top global universities, ensuring access to world-class education and career opportunities.",
    image: StudentVisa,
  },
  {
    title: "Free Visa Enquiry",
    description:
      "Not sure where to start? Get a Free Visa Enquiry to assess your eligibility, understand the process, and receive expert guidance tailored to your study, work, or travel needs.",
    image: Freevisa,
  },
];

const needs = [
  "Resident visa transfer to a new passport",
  "Variation or renewal of your existing resident visa",
  "Transfer of permanent residency visa to a new passport",
  "Guidance for dependent visas (spouse/children)",
  "Fast-track solutions for urgent travel & work permits",
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
          <h3 className="vs-infotitle">What Do You Need?</h3>
          <ul className="vs-list">
            {needs.map((need, index) => (
              <li key={index}>
                <FaCheck /> {need}
              </li>
            ))}
          </ul>
          <p className="vs-desc">
            Every immigration case is unique. Whether you’re applying for the first time or 
            renewing your visa, our expert team ensures personalized support and guidance 
            tailored to your needs.
          </p>
          {/* <button className="vs-btn">Explore More</button> */}
        </div>

        </div>

      </div>
    </section>
  );
};

export default VisaServices;
