import React, { useEffect, useState } from "react";
import "./ContactSection.css";
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

// Assets
import contactbg from "../../assets/Contact-bg.webp";

const ContactSection = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch contact details from backend
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contacts`);
        if (response.data.success && response.data.data.length > 0) {
          // Assuming first contact document is the one to display
          setContactData(response.data.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError("Failed to load contact information.");
        setLoading(false);
      }
    };
    fetchContactData();
  }, []);

  if (loading) {
    return (
      <section className="contact-section loading-section">
        <p>Loading contact information...</p>
      </section>
    );
  }

  if (error || !contactData) {
    return (
      <section className="contact-section error-section">
        <p>{error || "No contact details available."}</p>
      </section>
    );
  }

  const { email, phone, whatsapp, social, openHours, addresses } = contactData;

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
          {/* Call Us */}
          <div className="contact-info-box enhanced-box">
            <div className="contact-icons"><FaPhoneAlt /></div>
            <h3>Call Us</h3>
            <p className="contact-highlight">{phone || "N/A"}</p>
            {whatsapp && <p className="contact-subtext">WhatsApp: {whatsapp}</p>}
          </div>

          {/* Email */}
          <div className="contact-info-box enhanced-box">
            <div className="contact-icons"><FaEnvelope /></div>
            <h3>Email</h3>
            <p className="contact-highlight">{email || "N/A"}</p>
          </div>

          {/* Opening Hours */}
          <div className="contact-info-box enhanced-box">
            <div className="contact-icons"><FaClock /></div>
            <h3>Opening Hours</h3>
            <div className="opening-hours">
              {Object.entries(openHours).map(([day, time]) => (
                <div className="hours-row" key={day}>
                  <span className="day-label">{day}</span>
                  <span className="time-label">{time || "Closed"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="contact-info-box enhanced-box">
            <div className="contact-icons"><FaMapMarkerAlt /></div>
            <h3>Address</h3>
            {addresses && addresses.length > 0 ? (
              <ul className="address-list">
                {addresses.map((addr, idx) => (
                  <li key={idx}>{addr}</li>
                ))}
              </ul>
            ) : (
              <p>No address provided</p>
            )}
          </div>

          {/* Follow Us */}
          <div className="contact-info-box enhanced-box">
            <div className="contact-icons"><FaShareAlt /></div>
            <h3>Follow Us</h3>
            <div className="social-links-modern">
              {social?.facebook && (
                <a href={social.facebook} className="fb" target="_blank" rel="noopener noreferrer">Facebook</a>
              )}
              {social?.twitter && (
                <a href={social.twitter} className="tw" target="_blank" rel="noopener noreferrer">Twitter</a>
              )}
              {social?.instagram && (
                <a href={social.instagram} className="ig" target="_blank" rel="noopener noreferrer">Instagram</a>
              )}
              {social?.linkedin && (
                <a href={social.linkedin} className="ln" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              )}
            </div>
          </div>
        </section>

    </>
  );
};

export default ContactSection;
