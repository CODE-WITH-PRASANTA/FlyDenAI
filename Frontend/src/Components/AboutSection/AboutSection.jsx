import React from "react";
import "./AboutSection.css";
import mainImage from "../../assets/about1.webp"; 
import personImage from "../../assets/newsblog2.webp"; 
import avatar1 from "../../assets/avatar-1.webp";
import avatar2 from "../../assets/avatar-2.webp"; 
import avatar3 from "../../assets/avatar-3.webp"; 

const AboutSection = () => {
  return (
    <section className="about-section">
      {/* Left side images */}
      <div className="about-left">
        <div className="image-wrapper">
          <img src={mainImage} alt="Airplane" className="main-image" />
          <div className="small-image">
            <img src={personImage} alt="Person" />
          </div>
          <div className="experience-badge">
            <span>We’re</span>
            <h2>25+</h2>
            <p>Years Of Experience</p>
          </div>
        </div>
      </div>

      {/* Right side content */}
      <div className="about-right">
        <p className="sub-title">About Company</p>
        <h1>Welcome to Experience Visa Consulting Firm</h1>
        <p className="description">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae
          abillo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        <div className="features">
          <div className="feature">
            <span className="icon">📝</span>
            <div>
              <h4>Legal Immigration Success</h4>
            </div>
          </div>
          <div className="feature">
            <span className="icon">📂</span>
            <div>
              <h4>Regiments Document Support</h4>
            </div>
          </div>
          <div className="feature">
            <span className="icon">👨‍👩‍👧‍👦</span>
            <div>
              <h4>Family Ties & Visa Process & Report</h4>
            </div>
          </div>
          <div className="feature">
            <span className="icon">💻</span>
            <div>
              <h4>Free Online Assessment</h4>
            </div>
          </div>
        </div>

        <div className="about-footer">
          <button className="learn-more">Learn More Us &gt;</button>
          <div className="trusted">
            <span>10m+ Trusted Customer</span>
            <div className="client-avatars">
              <img src={avatar1} alt="client1" />
              <img src={avatar2} alt="client2" />
              <img src={avatar3} alt="client3" />
              <div className="more">+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
