import React, { useEffect } from "react";
import "./AboutCompany.css";
import c1 from "../../assets/contact-bg.webp";
import ceo from "../../assets/blog3.webp"; 

const AboutCompany = () => {
  
  useEffect(() => {
    const circles = document.querySelectorAll(".circle-progress");

    circles.forEach(circle => {
      const percent = circle.getAttribute("data-percent");
      const radius = circle.querySelector("circle:last-child").r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      circle.querySelector("circle:last-child").style.strokeDasharray = circumference;
      circle.querySelector("circle:last-child").style.strokeDashoffset = circumference;

      setTimeout(() => {
        circle.querySelector("circle:last-child").style.transition = "stroke-dashoffset 1.5s ease-out";
        circle.querySelector("circle:last-child").style.strokeDashoffset = offset;
      }, 300);
    });
  }, []);

  return (
    <section className="about-company">
      <div className="about-bg-pattern"></div>
      <div className="content-wrapper">

        {/* Left Image Section */}
        <div className="images-section">
          <div className="main-image">
            <img src={c1} alt="Couple with passports" />
          </div>
          <div className="sub-image">
            <img src={c1} alt="Consulting session" />
          </div>
        </div>

        {/* Right Info Section */}
        <div className="info-section">
          <div className="about-header">
            <span className="about-label">ABOUT COMPANY</span>
            <h1>Welcome To Experience Visa Consulting Firm</h1>
          </div>
          <p className="about-text">
            We provide global visa & immigration consulting solutions that make
            your travel and migration journey smooth, secure, and successful.
            Our expert consultants ensure you get professional guidance at every
            step of the process.
          </p>

          {/* Stats Section */}
          <div className="stats">
            {/* Stat 1 */}
            <div className="stat">
              <div className="circle-progress" data-percent="68">
                <svg>
                  <defs>
                    <linearGradient id="redGradient1" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff1744" />
                      <stop offset="100%" stopColor="#d32f2f" />
                    </linearGradient>
                  </defs>
                  <circle cx="70" cy="70" r="65"></circle>
                  <circle cx="70" cy="70" r="65"></circle>
                </svg>
                <span>68%</span>
              </div>
              <span className="stat-label">Business Strategy</span>
            </div>

            {/* Stat 2 */}
            <div className="stat">
              <div className="circle-progress" data-percent="93">
                <svg>
                  <defs>
                    <linearGradient id="redGradient2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff1744" />
                      <stop offset="100%" stopColor="#d32f2f" />
                    </linearGradient>
                  </defs>
                  <circle cx="70" cy="70" r="65"></circle>
                  <circle cx="70" cy="70" r="65"></circle>
                </svg>
                <span>93%</span>
              </div>
              <span className="stat-label">Technology Solutions</span>
            </div>
          </div>

          {/* Services */}
          <ul className="services">
            <li>Immigration & Visa Consulting</li>
            <li>Direct Online Interview</li>
            <li>99% Visa Approval Rate</li>
          </ul>

          {/* Additional Section */}
          <div className="additional-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
            <button className="learn-more-btn" style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Learn More Us 
            </button>
            <div className="ceo-info" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={ceo} alt="CEO" style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '10px' }} />
              <div>
                <h4 style={{ margin: 0 }}>John Doe</h4>
                <p style={{ margin: 0 }}>CEO & Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;  