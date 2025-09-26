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
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-col">
          <h3>Imagine A Better Future</h3>
          <p>
            The Most Eminent Visas & Immigration Consultant service provider.
          </p>

          <h4>Quick Links</h4>
          <ul className="quick-links">
            <li>+ business</li>
            <li>+ Countrie</li>
            <li>+ Application</li>
            <li>+ Migrate</li>
            <li>+ Evaluation</li>
            <li>+ Classes</li>
          </ul>

          <div className="social-icons">
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-col">
          <h3>100+ Best Universities Scholarship Programs From 20 Countries</h3>
          <p>
            We also help with other family based employment and investment based
            immigration.
          </p>
          <div className="flags">
            <img src="https://flagcdn.com/w40/nz.png" alt="New Zealand" />
            <img src="https://flagcdn.com/w40/us.png" alt="USA" />
            <img src="https://flagcdn.com/w40/ca.png" alt="Canada" />
            <img src="https://flagcdn.com/w40/fr.png" alt="France" />
          </div>
          <p className="apply-text">Apply Visa Now!</p>
        </div>

        {/* Right Section */}
        <div className="footer-col">
          <h3>Get In Touch</h3>
          <p>141, First Floor, 12 St Roots Terrace, Los Angeles 90010.</p>
          <p>Front Desk: +1-89-636-48018</p>
          <p>Email: info@yourdomain.com</p>
          <p className="branches">View All Branches</p>

          <h3>Sign up to Latest Updates</h3>
          <div className="subscribe">
            <input type="email" placeholder="Enter Your email address.." />
            <button>
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="footer-col img-col">
          <div className="footer-image-box">
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500"
              alt="Canada Immigration"
            />
            <div className="footer-img-text">
              <h4>Canada</h4>
              <h2>immigrations</h2>
              <p>Give Wings to Your Dream</p>
              <p>Call Us On: +123-456-7890</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright @ 2022 Truvik Template by Preyantechnosys All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;