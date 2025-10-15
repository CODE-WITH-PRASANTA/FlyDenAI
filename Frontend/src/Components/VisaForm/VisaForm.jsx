import React from "react";
import "./VisaForm.css";

const VisaForm = () => {
  return (
    <div className="float-contact-form-wrapper">
      {/* Form Header */}
      <div className="float-contact-form-header">
        ⏱️ It takes less than <strong>2 minutes</strong> to Apply
      </div>

      {/* Form Inputs */}
      <form className="float-contact-form">
        <input
          type="email"
          className="float-contact-form-input"
          placeholder="Email ID"
          required
        />
        <input
          type="tel"
          className="float-contact-form-input"
          placeholder="Contact No"
          required
        />
        <select className="float-contact-form-select" required>
          <option value="">Select Visa Type</option>
          <option value="mdac">Digital Arrival Card</option>
          <option value="sticker">Sticker Visa</option>
        </select>
        <select className="float-contact-form-select" required>
          <option value="">Travellers</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3+</option>
        </select>

        {/* Form Footer */}
        <div className="float-contact-form-footer">
          <span className="float-contact-form-price">₹0</span>
          <button type="submit" className="float-contact-form-button">
            APPLY NOW
          </button>
        </div>

        {/* Contact Options Grid */}
        <div className="float-contact-form-grid">
          <div className="float-contact-card">
            <div className="float-contact-card-header">
              <span className="float-contact-icon">📱</span>
              <div className="float-contact-info">
                <span className="float-contact-title">Visa on WhatsApp</span>
                <span className="float-contact-desc">+91 7506865623</span>
              </div>
            </div>
          </div>

          <div className="float-contact-card">
            <div className="float-contact-card-header">
              <span className="float-contact-icon">📞</span>
              <div className="float-contact-info">
                <span className="float-contact-title">Call Us</span>
                <span className="float-contact-desc">02240666444</span>
              </div>
            </div>
          </div>

          <div className="float-contact-card">
            <div className="float-contact-card-header">
              <span className="float-contact-icon">⏰</span>
              <div className="float-contact-info">
                <span className="float-contact-title">Timing</span>
                <span className="float-contact-desc">9am to 9pm</span>
              </div>
            </div>
          </div>

          <div className="float-contact-card">
            <div className="float-contact-card-header">
              <span className="float-contact-icon">📍</span>
              <div className="float-contact-info">
                <span className="float-contact-title">Visit Office</span>
                <span className="float-contact-desc">
                  Near Crawford Market, Mumbai
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VisaForm;
