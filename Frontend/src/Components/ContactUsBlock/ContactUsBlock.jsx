import React from "react";
import "./ContactUsBlock.css";
import bg from "../../assets/contact.webp";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShareAlt,
  FaFacebookF,
  FaTwitter,
  FaVimeoV,
  FaPinterestP,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

const ContactUsBlock = () => {
  return (
    <section className="contact-us-block">
      <div className="contact-us-wrapper">
        {/* LEFT: info */}
        <div className="contact-us-left">
          <p className="contact-us-sub">GET IN TOUCH</p>
          <h2 className="contact-us-heading">Contact Us</h2>
          <p className="contact-us-lead">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque
            inventore.
          </p>

          <div className="contact-us-grid">
            {/* 1st row */}
            <div className="contact-us-item">
              <FaMapMarkerAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Location</h4>
                <p>
                  55 Main street, 2nd block,<br />
                  Melbourne, Australia
                </p>
              </div>
            </div>

            <div className="contact-us-item">
              <FaPhoneAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Phone</h4>
                <p>+09 354 587 874<br />+01 368 567 894</p>
              </div>
            </div>

            {/* 2nd row */}
            <div className="contact-us-item">
              <FaEnvelope className="ciu-icon" />
              <div className="ciu-text">
                <h4>Email</h4>
                <p>info@example.com<br />info@example.com</p>
              </div>
            </div>

            <div className="contact-us-item">
              <FaShareAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Social</h4>
                <div className="ciu-socials">
                  <a aria-label="facebook" href="#"><FaFacebookF /></a>
                  <a aria-label="twitter" href="#"><FaTwitter /></a>
                  <a aria-label="vimeo" href="#"><FaVimeoV /></a>
                  <a aria-label="pinterest" href="#"><FaPinterestP /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-us-photo">
            <img src={bg} alt="Team" />
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="contact-us-right">
          <h2 className="contact-us-form-heading">Fill Up The Form</h2>
          <p className="contact-us-form-sub">
            Your email address will not be published.<br />
            Required fields are marked *
          </p>

          <form className="contact-us-form" onSubmit={(e) => e.preventDefault()}>
            <label className="ciu-label">
              <div className="ciu-inputwrap">
                <FaUser className="ciu-formicon" />
                <input className="ciu-input" type="text" placeholder="Your Name*" required />
              </div>
            </label>

            <label className="ciu-label">
              <div className="ciu-inputwrap">
                <FaEnvelope className="ciu-formicon" />
                <input className="ciu-input" type="email" placeholder="Email Address*" required />
              </div>
            </label>

            <label className="ciu-label">
              <div className="ciu-inputwrap">
                <FaPaperPlane className="ciu-formicon" />
                <textarea className="ciu-textarea" placeholder="Enter Your Message Here" rows="5"></textarea>
              </div>
            </label>

            <div className="ciu-submit-wrap">
              <button className="ciu-submit" type="submit">
                <span className="ciu-submit-icon">✈</span>
                <span>Get In Touch</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsBlock;
