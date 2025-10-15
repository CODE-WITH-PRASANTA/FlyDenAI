import React, { useState, useRef, useEffect } from "react";
import "./Documents.css";

import i1 from "../../assets/sc1.webp";
import i2 from "../../assets/sc2.webp";
import i3 from "../../assets/sc3.webp";
import i4 from "../../assets/sc4.webp";
import i5 from "../../assets/sc5.webp";
import i6 from "../../assets/sc6.webp";

const teamMembers = [
  { name: "Sakshi Jambekar", img: i1, exp: "2 Years" },
  { name: "Airaf Shaikh", img: i2, exp: "2 Years" },
  { name: "Purva Sawant", img: i3, exp: "3 Years" },
  { name: "Mehul Jain", img: i4, exp: "4 Years" },
  { name: "Ritika Sharma", img: i5, exp: "5 Years" },
  { name: "Rahul Singh", img: i6, exp: "3 Years" },
];

const documentData = {
  online: [
    "Valid Passport with minimum 6 months validity",
    "Recent Passport-sized photograph with white background",
    "Confirmed return flight tickets",
    "Proof of accommodation in Malaysia",
    "Proof of sufficient funds",
    "Completed online visa application form",
    "Copy of PAN card or Aadhar card",
  ],
  sticker: [
    "Valid Passport with minimum 6 months validity",
    "Recent Passport-sized photograph with white background",
    "Confirmed return flight tickets",
    "Proof of accommodation in Malaysia",
    "Proof of sufficient funds",
    "Completed visa application form (hard copy)",
    "Covering letter explaining purpose of visit",
    "Invitation letter from Malaysia (if applicable)",
    "Copy of PAN card or Aadhar card",
  ],
};

const Documents = () => {
  const [openSection, setOpenSection] = useState(null);
  const carouselRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Auto scroll carousel
  useEffect(() => {
    const scrollAmount = 1; // px per tick
    const speed = 20; // ms interval
    const carousel = carouselRef.current;

    const interval = setInterval(() => {
      if (carousel) {
        if (
          carousel.scrollLeft >=
          carousel.scrollWidth - carousel.clientWidth
        ) {
          carousel.scrollLeft = 0; // loop back
        } else {
          carousel.scrollLeft += scrollAmount;
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="documents" className="documents-wrapper">
      <div className="documents-container">
        <div className="documents-left">
          <h2 className="documents-title">
            Documents required for Malaysia Visa for Indians
          </h2>

          {/* Toggle Sections */}
          {["online", "sticker"].map((type) => (
            <div key={type} className="document-section">
              <button
                className="document-toggle-btn"
                onClick={() => toggleSection(type)}
                aria-expanded={openSection === type}
              >
                {type === "online"
                  ? "Must have Documents for Malaysia Visa Online"
                  : "Must have Documents for Malaysia Sticker Visa"}
                <span className={`arrow ${openSection === type ? "open" : ""}`}>▼</span>
              </button>

              <div
                className={`documents-list ${openSection === type ? "open" : ""}`}
              >
                <ul>
                  {documentData[type].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Team Carousel */}
          <div className="team-section">
            <h3>Meet Our Team Of Visa Experts</h3>
            <div className="team-carousel" ref={carouselRef}>
              {teamMembers.map((member, i) => (
                <div className="team-card" key={i}>
                  <img src={member.img} alt={member.name} className="team-photo" />
                  <div className="team-info">
                    <strong>{member.name}</strong>
                    <div>Senior Visa Officer</div>
                    <div>{member.exp} of Experience</div>
                  </div>
                </div>
              ))}
              {/* Duplicate cards for infinite feel */}
              {teamMembers.map((member, i) => (
                <div className="team-card" key={`dup-${i}`}>
                  <img src={member.img} alt={member.name} className="team-photo" />
                  <div className="team-info">
                    <strong>{member.name}</strong>
                    <div>Senior Visa Officer</div>
                    <div>{member.exp} of Experience</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visa Process Banner */}
          <div className="visa-process-banner">
            <strong>Malaysia Visa process and requirements</strong>
            <button className="click-here-btn">Click Here</button>
          </div>

          {/* Sample Visa Card */}
          <div className="sample-visa-card">
            <div className="sample-visa-icon">📄</div>
            <div className="sample-visa-text">View Sample Visa Copy</div>
            <button className="sample-visa-btn">View Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
