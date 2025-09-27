import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        {/* Left Section */}
        <div className="Footer-col Footer-left">
          <h3 className="Footer-title">Imagine A Better Future</h3>
          <p className="Footer-text">
            The Most Eminent Visas & Immigration Consultant service provider.
          </p>

          <h4 className="Footer-subtitle">Quick Links</h4>
          <ul className="Footer-links">
            <li>Business</li>
            <li>Countries</li>
            <li>Application</li>
            <li>Migrate</li>
            <li>Evaluation</li>
            <li>Classes</li>
          </ul>

          <div className="Footer-social">
            <a href="#" className="Footer-social-link"><FaInstagram /></a>
            <a href="#" className="Footer-social-link"><FaFacebookF /></a>
            <a href="#" className="Footer-social-link"><FaTwitter /></a>
            <a href="#" className="Footer-social-link"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="Footer-col Footer-middle">
          <h3 className="Footer-title">100+ Best Universities Scholarship Programs</h3>
          <p className="Footer-text">
            We also help with other family-based employment and investment immigration.
          </p>
          <div className="Footer-flags">
            <img src="https://flagcdn.com/w40/nz.png" alt="New Zealand" />
            <img src="https://flagcdn.com/w40/us.png" alt="USA" />
            <img src="https://flagcdn.com/w40/ca.png" alt="Canada" />
            <img src="https://flagcdn.com/w40/fr.png" alt="France" />
          </div>
          <p className="Footer-apply">Apply Visa Now!</p>
        </div>

        {/* Right Section */}
        <div className="Footer-col Footer-right">
          <h3 className="Footer-title">Get In Touch</h3>
          <p className="Footer-text">141, First Floor, 12 St Roots Terrace, Los Angeles 90010</p>
          <p className="Footer-text">Front Desk: +1-89-636-48018</p>
          <p className="Footer-text">Email: info@yourdomain.com</p>
          <p className="Footer-branches">View All Branches</p>

          <h3 className="Footer-title">Sign Up for Latest Updates</h3>
          <div className="Footer-subscribe">
            <input type="email" placeholder="Enter your email address" />
            <button className="Footer-subscribe-btn"><FaPaperPlane /></button>
          </div>
        </div>

        {/* Image Section */}
        <div className="Footer-col Footer-image">
          <div className="Footer-image-box">
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500"
              alt="Canada Immigration"
            />
            <div className="Footer-image-text">
              <h4>Canada</h4>
              <h2>Immigrations</h2>
              <p>Give Wings to Your Dream</p>
              <p>Call Us On: +123-456-7890</p>
            </div>
          </div>
        </div>
      </div>

    <div className="Footer-bottom">
  <p>Copyright © 2022 PR WEBSTOCK. All rights reserved.</p>
</div>

    </footer>
  );
};

export default Footer;
