import React from "react";
import "./DirectorProfile.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import director from "../../assets/director.webp"; // Replace with actual image path

const DirectorProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={director} alt="Director" />
      </div>

      <div className="profile-details">
        <span className="profile-role">Director</span>
        <h2 className="profile-name">Alex Sam Martin</h2>
        <p className="profile-description">
          Foundation was established with a small idea that was incepted in the
          minds of its promoters in the year 1987! We skillfully guide the
          applicants for their immigration process to any country they aspire to
          settle. Foundation was established with a small idea that was
          incepted in the minds of its promoters in the year We skillfully
          guide the applicant.
        </p>

        <div className="profile-contact">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon"  />
            <div>
              <span className="contact-title">Address :</span>
              <p>7202 E. New Drive Erlanger, KY 41018<br />30 Commercial Australia</p>
            </div>
          </div>

          <div className="contact-item">
            <FaPhoneAlt className="contact-icon"  />
            <div>
              <span className="contact-title">Contact Me:</span>
              <p>+18000 123 4567890</p>
            </div>
          </div>

          <div className="contact-item">
            <FaEnvelope className="contact-icon"  />
            <div>
              <span className="contact-title">Email :</span>
              <p>info@example.com</p>
            </div>
          </div>
        </div>

        <button className="contact-button">Contact Team</button>
      </div>
    </div>
  );
};

export default DirectorProfile;
