import React, { useEffect, useState } from "react";
import "./ContactUsBlock.css";
import bg from "../../assets/contact.webp";
import axios from "axios";
import BASE_URL from "../../Api";
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
  FaClock, // ✅ Added this missing icon
} from "react-icons/fa";

const ContactUsBlock = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch contact info from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/contacts`);
        if (res.data.success && res.data.data.length > 0) {
          setContactData(res.data.data[0]); // show latest/published contact
        } else {
          setError("No contact information found.");
        }
      } catch (err) {
        console.error("Error fetching contact info:", err);
        setError("Failed to load contact information.");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <section className="contact-us-block">
        <p className="loading-text">Loading contact details...</p>
      </section>
    );
  }

  if (error || !contactData) {
    return (
      <section className="contact-us-block">
        <p className="error-text">{error || "Something went wrong!"}</p>
      </section>
    );
  }

  const { email, phone, whatsapp, social, openHours, addresses } = contactData;

  return (
    <section className="contact-us-block">
      <div className="contact-us-wrapper">
        {/* LEFT: Info */}
        <div className="contact-us-left">
          <p className="contact-us-sub">GET IN TOUCH</p>
          <h2 className="contact-us-heading">Contact Us</h2>
          <p className="contact-us-lead">
            Reach out to FlyDenAi Consultancy for any queries regarding visas,
            study abroad programs, and internships. Our professional team is
            ready to assist you with expert advice.
          </p>

          <div className="contact-us-grid">
            {/* 📍 Addresses */}
            {addresses && addresses.length > 0 ? (
              addresses.map((address, idx) => (
                <div className="contact-us-item" key={idx}>
                  <FaMapMarkerAlt className="ciu-icon" />
                  <div className="ciu-text">
                    <h4>Office {idx + 1}</h4>
                    <p>{address}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No office addresses found.</p>
            )}

            {/* 📞 Phone */}
            <div className="contact-us-item">
              <FaPhoneAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Phone</h4>
                <p>{phone || "N/A"}</p>
                {whatsapp && <p>WhatsApp: {whatsapp}</p>}
              </div>
            </div>

            {/* 📧 Email */}
            <div className="contact-us-item">
              <FaEnvelope className="ciu-icon" />
              <div className="ciu-text">
                <h4>Email</h4>
                <p>{email || "N/A"}</p>
              </div>
            </div>

            {/* 🕒 Open Hours */}
            <div className="contact-us-item">
              <FaClock className="ciu-icon" />
              <div className="ciu-text">
                <h4>Opening Hours</h4>
                {Object.entries(openHours || {}).map(([day, time]) => (
                  <p key={day}>
                    {day}: {time || "Closed"}
                  </p>
                ))}
              </div>
            </div>

            {/* 🌐 Social */}
            <div className="contact-us-item">
              <FaShareAlt className="ciu-icon" />
              <div className="ciu-text">
                <h4>Social</h4>
                <div className="ciu-socials">
                  {social?.facebook && (
                    <a
                      href={social.facebook}
                      aria-label="facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {social?.twitter && (
                    <a
                      href={social.twitter}
                      aria-label="twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {social?.instagram && (
                    <a
                      href={social.instagram}
                      aria-label="instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaVimeoV />
                    </a>
                  )}
                  {social?.linkedin && (
                    <a
                      href={social.linkedin}
                      aria-label="linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaPinterestP />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 📸 Background Image */}
          <div className="contact-us-photo">
            <img src={bg} alt="Team" />
          </div>
        </div>

        {/* RIGHT: Form */}
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
                <input
                  className="ciu-input"
                  type="text"
                  placeholder="Your Name*"
                  required
                />
              </div>
            </label>

            <label className="ciu-label">
              <div className="ciu-inputwrap">
                <FaEnvelope className="ciu-formicon" />
                <input
                  className="ciu-input"
                  type="email"
                  placeholder="Email Address*"
                  required
                />
              </div>
            </label>

            <label className="ciu-label">
              <div className="ciu-inputwrap">
                <FaPaperPlane className="ciu-formicon" />
                <textarea
                  className="ciu-textarea"
                  placeholder="Enter Your Message Here"
                  rows="5"
                  required
                ></textarea>
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
