import React, { useEffect, useState } from "react";
import "./ContactSection.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaShareAlt,
  FaArrowRight,
  FaCheckCircle,
  FaWhatsapp,
} from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api";

// Asset
import contactbg from "../../assets/Contact-bg.webp";

const ContactSection = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH CONTACT DATA
  // =====================================================

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${BASE_URL}/contacts`);

        if (
          response.data?.success &&
          response.data?.data?.length > 0
        ) {
          setContactData(response.data.data[0]);
        } else {
          setContactData(null);
        }
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError("Failed to load contact information.");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="contact-loading-section">
        <div className="contact-loading-card">
          <span className="contact-loader"></span>
          <p>Loading Flyixo contact information...</p>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !contactData) {
    return (
      <section className="contact-error-section">
        <div className="contact-error-card">
          <div className="contact-error-icon">!</div>

          <h3>Contact Information Unavailable</h3>

          <p>
            {error || "No contact details available."}
          </p>
        </div>
      </section>
    );
  }

  const {
    email,
    phone,
    whatsapp,
    social,
    openHours,
    addresses,
  } = contactData;

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "Thank you for contacting Flyixo. Our team will get back to you soon."
    );
  };

  return (
    <>
      {/* =====================================================
          CONTACT HERO / FORM SECTION
      ===================================================== */}

      <section className="contact-section">
        {/* Background Decorations */}
        <div className="contact-bg-shape contact-bg-shape-one"></div>
        <div className="contact-bg-shape contact-bg-shape-two"></div>
        <div className="contact-grid-pattern"></div>

        <div className="contact-container">
          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="contact-image-wrapper">
            <div className="contact-image">
              <img
                src={contactbg}
                alt="Flyixo Contact Office"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="contact-image-overlay"></div>

              <div className="contact-image-content">
                <span className="contact-image-eyebrow">
                  FLYIXO GLOBAL SERVICES
                </span>

                <h3>
                  Let's Start Your
                  <span> Global Journey</span>
                </h3>

                <p>
                  Have questions about visas, study abroad,
                  immigration or international opportunities?
                  Our team is ready to help.
                </p>

                <div className="contact-image-badge">
                  <FaCheckCircle />
                  <span>Professional Assistance</span>
                </div>
              </div>

              <div className="contact-image-brand">
                FLYIXO
              </div>
            </div>

            <div className="contact-floating-card">
              <div className="contact-floating-icon">
                <FaHeadset />
              </div>

              <div>
                <span>NEED HELP?</span>
                <strong>Talk To Our Experts</strong>
              </div>
            </div>
          </div>

          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <span className="contact-eyebrow">
                CONTACT FLYIXO
              </span>

              <h2 className="contact-title">
                Have Any Questions?
                <br />
                Feel Free To{" "}
                <span>Contact Us</span>
              </h2>

              <p className="contact-form-description">
                Tell us what you need help with and our
                professional team will guide you through the
                next steps.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Full Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email Address
                </label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Service */}
              <div className="contact-field">
                <label htmlFor="contact-service">
                  Select Service
                </label>

                <select
                  id="contact-service"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>

                  <option value="immigration">
                    Immigration Consultant
                  </option>

                  <option value="study">
                    Study and Work Visa
                  </option>

                  <option value="business">
                    Business Visit Visa
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="contact-field">
                <label htmlFor="contact-message">
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  placeholder="Write your message here..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
              >
                <span>Submit Here</span>
                <span className="submit-btn-icon">
                  <FaArrowRight />
                </span>
              </button>
            </form>

            <div className="contact-form-trust">
              <FaCheckCircle />
              <span>
                Your information is handled securely by Flyixo.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <section className="contact-info-section">
        <div className="contact-info-bg"></div>

        <div className="contact-info-container">
          {/* Section Header */}
          <div className="contact-info-header">
            <div className="contact-info-eyebrow">
              <span></span>
              FLYIXO CONTACT INFORMATION
              <span></span>
            </div>

            <h2>
              We're Here To{" "}
              <span>Help You</span>
            </h2>

            <p>
              Connect with Flyixo for professional guidance,
              global opportunities and personalized support.
            </p>
          </div>

          {/* =================================================
              CALL US
          ================================================= */}

          <div className="contact-info-box enhanced-box">
            <div className="contact-info-number">
              01
            </div>

            <div className="contact-icons">
              <FaPhoneAlt />
            </div>

            <h3>Call Us</h3>

            <p className="contact-highlight">
              {phone || "N/A"}
            </p>

            {whatsapp && (
              <a
                href={`https://wa.me/${String(whatsapp).replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-whatsapp"
              >
                <FaWhatsapp />
                <span>WhatsApp: {whatsapp}</span>
              </a>
            )}
          </div>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="contact-info-box enhanced-box">
            <div className="contact-info-number">
              02
            </div>

            <div className="contact-icons">
              <FaEnvelope />
            </div>

            <h3>Email</h3>

            <a
              href={`mailto:${email || ""}`}
              className="contact-highlight contact-email-link"
            >
              {email || "N/A"}
            </a>
          </div>

          {/* =================================================
              OPENING HOURS
          ================================================= */}

          <div className="contact-info-box enhanced-box">
            <div className="contact-info-number">
              03
            </div>

            <div className="contact-icons">
              <FaClock />
            </div>

            <h3>Opening Hours</h3>

            <div className="opening-hours">
              {openHours &&
              Object.keys(openHours).length > 0 ? (
                Object.entries(openHours).map(
                  ([day, time]) => (
                    <div
                      className="hours-row"
                      key={day}
                    >
                      <span className="day-label">
                        {day}
                      </span>

                      <span className="time-label">
                        {time || "Closed"}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="hours-empty">
                  Opening hours unavailable
                </p>
              )}
            </div>
          </div>

          {/* =================================================
              ADDRESS
          ================================================= */}

          <div className="contact-info-box enhanced-box">
            <div className="contact-info-number">
              04
            </div>

            <div className="contact-icons">
              <FaMapMarkerAlt />
            </div>

            <h3>Address</h3>

            {addresses &&
            addresses.length > 0 ? (
              <ul className="address-list">
                {addresses.map((addr, idx) => (
                  <li key={idx}>
                    <FaMapMarkerAlt />
                    <span>{addr}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="address-empty">
                No address provided
              </p>
            )}
          </div>

          {/* =================================================
              SOCIAL MEDIA
          ================================================= */}

          <div className="contact-info-box enhanced-box">
            <div className="contact-info-number">
              05
            </div>

            <div className="contact-icons">
              <FaShareAlt />
            </div>

            <h3>Follow Us</h3>

            <div className="social-links-modern">
              {social?.facebook && (
                <a
                  href={social.facebook}
                  className="fb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              )}

              {social?.twitter && (
                <a
                  href={social.twitter}
                  className="tw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              )}

              {social?.instagram && (
                <a
                  href={social.instagram}
                  className="ig"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              )}

              {social?.linkedin && (
                <a
                  href={social.linkedin}
                  className="ln"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}

              {!social?.facebook &&
                !social?.twitter &&
                !social?.instagram &&
                !social?.linkedin && (
                  <span className="social-empty">
                    Social links unavailable
                  </span>
                )}
            </div>
          </div>
        </div>

        {/* Bottom Brand */}
        <div className="contact-bottom-brand">
          <span></span>

          <p>
            Professional guidance. Global opportunities.{" "}
            <strong>Flyixo</strong>.
          </p>

          <span></span>
        </div>
      </section>
    </>
  );
};

export default ContactSection;