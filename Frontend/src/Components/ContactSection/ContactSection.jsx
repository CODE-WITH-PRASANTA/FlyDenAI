import React from "react";
import "./ContactSection.css";
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";

// Assets
import contactbg from '../../assets/Contact-bg.webp'

const ContactSection = () => {
  return (
    <>
      {/* ====== Contact Form Section ====== */}
      <section className="contact-section">
        <div className="contact-image">
          <img src={contactbg} alt="Office building" />
        </div>

        <div className="contact-form-wrapper">
          <h2 className="contact-title">
            Have any questions? <br />
            Feel free to <span>Contact Us</span>
          </h2>

          <form className="contact-form">
            <input type="text" placeholder="Your Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <select required>
              <option value="">Select Service</option>
              <option value="immigration">Immigration Consultant</option>
              <option value="study">Study and Work Visa</option>
              <option value="business">Business Visit Visa</option>
            </select>
            <textarea placeholder="Your Message" rows="5" required></textarea>

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
          <h3>Call Us</h3>
          <p>+91 990 533 7044</p>
        </div>

        <div className="contact-info-box">
          <div className="contact-icons"><FaEnvelope /></div>
          <h3>Email</h3>
          <p>infoflydenai@gmail.com</p>
        </div>

        <div className="contact-info-box">
          <div className="contact-icons"><FaClock /></div>
          <h3>Opening Hours</h3>
          <p>Monday – Saturday: 09:00 AM – 07:00 PM</p>
        </div>

        <div className="contact-info-box">
          <div className="contact-icons"><FaMapMarkerAlt /></div>
          <h3>Address</h3>
          <p>
            FlyDenAi Consultancy Pvt. Ltd.<br />
            2nd Floor, ABC Tower,<br />
            Sector 14, Dwarka, New Delhi – 110075, India
          </p>
        </div>

        <div className="contact-info-box">
          <div className="contact-icons"><FaShareAlt /></div>
          <h3>Follow Us</h3>
          <p>Facebook, Twitter, Instagram, LinkedIn</p>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
