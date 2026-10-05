import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import "./Footer.css";

import logo from "../../assets/logo-main.png";

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* Background Decorations */}
      <div className="footer-glow footer-glow-one"></div>
      <div className="footer-glow footer-glow-two"></div>
      <div className="footer-grid-pattern"></div>

      <div className="footer-container">

        {/* ================= TOP SECTION ================= */}
        <div className="footer-top">

          {/* Logo */}
          <div className="footer-brand-wrapper">

            <div className="footer-logo-box">
              <img
                src={logo}
                alt="Flyixo Logo"
                className="footer-logo"
              />
            </div>

            <div className="footer-brand-content">
              <h3 className="footer-brand">
                Fly<span>ixo</span>
              </h3>

              <span className="footer-brand-label">
                GLOBAL JOURNEY PARTNER
              </span>
            </div>

          </div>

          {/* Tagline */}
          <p className="footer-tagline">
            Empowering your global journey with seamless visa,
            study, and travel solutions.
          </p>

          {/* Social Icons */}
          <div className="footer-social">

            <a
              href="#"
              aria-label="Facebook"
              className="footer-social-link"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="footer-social-link"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="footer-social-link"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="footer-social-link"
            >
              <FaLinkedinIn />
            </a>

          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="footer-navigation">

          <div className="footer-navigation-title">
            <span></span>
            Quick Links
            <span></span>
          </div>

          <div className="footer-links">

            <a
              href="/PrivacyPolicy"
              className="footer-link"
            >
              Privacy Policy
            </a>

            <a
              href="/TermAndCondition"
              className="footer-link"
            >
              Terms & Conditions
            </a>

            <a
              href="/AllCountry"
              className="footer-link"
            >
              Visa Service
            </a>

            <a
              href="/StudyAbroad"
              className="footer-link"
            >
              Study Abroad
            </a>

            <a
              href="/InternsAbroad"
              className="footer-link"
            >
              Intern Abroad
            </a>

          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="footer-divider">
          <span></span>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="footer-bottom">

          <div className="footer-copyright">

            <p>
              © 2025{" "}
              <span className="footer-highlight">
                Flyixo
              </span>
              . All Rights Reserved.
            </p>

            <p className="footer-powered">
              Powered by{" "}
              <span className="footer-highlight">
                Flyixo
              </span>
            </p>

          </div>

          <div className="footer-developer">

            <span>Developed by</span>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
            >
              PR WEBSTOCK
            </a>

          </div>

        </div>

        {/* ================= SCROLL TOP ================= */}
        <button
          type="button"
          className="footer-scroll-top"
          onClick={handleScrollTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>

      </div>
    </footer>
  );
};

export default Footer;