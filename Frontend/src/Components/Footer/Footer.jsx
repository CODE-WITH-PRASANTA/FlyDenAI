import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <h3 className="footer-brand">FlyDenAi</h3>
        <p className="footer-tagline">
          Empowering your global journey with seamless visa, study, and travel solutions.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
      </div>

      {/* Middle Links */}
      <div className="footer-links">
        <a href="/PrivacyPolicy">Privacy Policy</a>
        <a href="/TermAndCondition">Terms & Conditions</a>
        <a href="/AllCountry">Visa Service</a>
        <a href="/StudyAbroad">Study Abroad</a>
        <a href="/InternsAbroad">Intern Abroad</a>
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          © 2025 <span className="highlight">FlyDenAi</span>. All Rights Reserved. | Powered by{" "}
          <span className="highlight">FlyDenAi</span>
        </p>
        <p>
          Developed by{" "}
          <a
            href="https://prwebstock.com"
            target="_blank"
            rel="noopener noreferrer"
            className="developer-link"
          >
            PR WEBSTOCK
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
