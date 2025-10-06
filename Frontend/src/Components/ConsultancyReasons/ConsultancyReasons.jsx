import React from "react";
import "./ConsultancyReasons.css";
import { FaComments, FaFileAlt, FaPassport } from "react-icons/fa";

// Image imports (replace these with your actual image paths)
import mainImage from "../../assets/some.webp";
import sideImage1 from "../../assets/blog2.webp";
import sideImage2 from "../../assets/some3.webp";
import avatar1 from "../../assets/ts2.webp";
import avatar2 from "../../assets/ts3.webp";
import avatar3 from "../../assets/ts4.webp";

const ConsultancyReasons = () => {
  const reasons = [
    {
      title: "Direct Online Interviews",
      description:
        "Attend your interviews from anywhere with our seamless online platform.",
      icon: <FaComments />,
    },
    {
      title: "Quick & Easy Process",
      description:
        "We streamline the entire application process for speed and simplicity.",
      icon: <FaFileAlt />,
    },
    {
      title: "99% Visa Approvals",
      description:
        "Our expert team ensures a high visa approval rate across regions.",
      icon: <FaPassport />,
    },
  ];

  return (
    /* ===== Consultancy Reasons Section ===== */
    <section className="consultancy-reasons">
      <div className="reasons-content">
        {/* ===== Left Column ===== */}
        <div className="reasons-left">
          <h3 className="choose-header">Why Choose Us</h3>
          <h2>Some Reasons People Like Our Consultancy</h2>
          <p>
            Transmds is the world’s leading worldwide logistics supplier — 
            we uphold industry and exchange the worldwide trade of merchandise.
          </p>

          <div className="reason-items">
            {reasons.map((reason, i) => (
              <div key={i} className="reason-box">
                <div className="icon">{reason.icon}</div>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Right Column ===== */}
        <div className="reasons-right">
          <div className="image-group">
            <div className="main-image-wrapper">
              <img src={mainImage} alt="Main visual" className="main-image" />
              <div className="trusted-box">
                <p>10M+ Trusted Customer</p>
                <div className="avatars">
                  <img src={avatar1} alt="Avatar 1" />
                  <img src={avatar2} alt="Avatar 2" />
                  <img src={avatar3} alt="Avatar 3" />
                </div>
              </div>
            </div>

            <div className="side-images">
              <img src={sideImage1} alt="Meeting" />
              <img src={sideImage2} alt="Clients" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultancyReasons;
