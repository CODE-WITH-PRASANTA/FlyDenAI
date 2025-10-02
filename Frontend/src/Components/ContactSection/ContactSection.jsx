import React from "react";
import "./ContactSection.css";
import { FaPhoneAlt, FaEnvelope, FaClock, FaShareAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <>
      {/* ====== Contact Form Section ====== */}
      <section className="contact-section">
        <div className="contact-image">
          <img src="" alt="Office building" />
        </div>

        <div className="contact-form-wrapper">
          <h2 className="contact-title">
            Have be any question? <br />
            feel free to <span>Contact</span>
          </h2>

          <form className="contact-form">
            <input type="text" placeholder="Your Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <select required>
              <option value="">Services</option>
              <option value="immigration">Immigration Consultant</option>
              <option value="study">Study and Work Visa</option>
              <option value="business">Business Visit Visa</option>
            </select>
            <textarea placeholder="Your Message" rows="5"></textarea>

            <button type="submit" className="submit-btn">
              Submit Here
            </button>
          </form>
        </div>
      </section>

      {/* ====== Contact Info Section ====== */}
      <section className="contact-info-section">
        <div className="contact-info-box">
          <div className="contact-icons"><FaPhoneAlt /></div>
          <h3>Call Us On</h3>
          <p>+98 060 712 34 & 812 34</p>
        </div>

        <div className="contact-info-box">
          <div className="contact-icons"><FaEnvelope /></div>
          <h3>Email</h3>
          <p>supportyou@info.com</p>
        </div>

        <div className="contact-info-box">
          <div className="contact-icons"><FaClock /></div>
          <h3>Opening Hours</h3>
          <p>Mon–Sat: 09.00 to 07.00</p>
        </div>

        <div className="contact-info-box">
          <div className="contact-icons"><FaShareAlt /></div>
          <h3>Share</h3>
          <p>Facebook, Twitter, Instagram</p>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
