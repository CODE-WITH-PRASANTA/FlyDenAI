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
            Reach out to FlyDenAi Consultancy for any queries regarding visas,
            study abroad programs, and internships. Our offices in Uttar Pradesh
            are here to assist you professionally.
          </p>

          <div className="contact-us-grid">
            {/* Delhi Office */}
            <div className="contact-us-item">
              <FaMapMarkerAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Delhi Office</h4>
                <p>
                  FlyDenAi Consultancy Pvt. Ltd.<br />
                  2nd Floor, ABC Tower,<br />
                  Sector 14, Dwarka, New Delhi – 110075, India
                </p>
              </div>
            </div>

            {/* Lucknow Office */}
            <div className="contact-us-item">
              <FaMapMarkerAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Lucknow Office</h4>
                <p>
                  2nd Floor, HCL Tower,<br />
                  17 Ashok Marg, Hazratganj, Lucknow – 226001, Uttar Pradesh, India
                </p>
              </div>
            </div>

            {/* Noida Office */}
            <div className="contact-us-item">
              <FaMapMarkerAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Noida Office</h4>
                <p>
                  Unit 305, Sector 18,<br />
                  Noida, Gautam Buddha Nagar – 201301, Uttar Pradesh, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-us-item">
              <FaPhoneAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Phone</h4>
                <p>+91 990 533 7044<br />+91 990 533 7044</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-us-item">
              <FaEnvelope className="ciu-icon" />
              <div className="ciu-text">
                <h4>Email</h4>
                <p>infoflydenai@gmail.com<br />support@flydenai.com</p>
              </div>
            </div>

            {/* Social */}
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
                <textarea className="ciu-textarea" placeholder="Enter Your Message Here" rows="5" required></textarea>
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
