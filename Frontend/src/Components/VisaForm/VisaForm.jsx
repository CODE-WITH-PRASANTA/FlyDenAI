import React from "react";
import "./VisaForm.css";

const VisaForm = () => {
  return (
    <div className="visa-application-form">
      {/* Form Header */}
      <div className="form-header">
        ⏱️ It takes less than <strong>2 minutes</strong> to Apply
      </div>

      {/* Form Inputs */}
      <form>
        <input type="email" placeholder="Email ID" required />
        <input type="tel" placeholder="Contact No" required />
        <select required>
          <option value="">Select Visa Type</option>
          <option value="mdac">Digital Arrival Card</option>
          <option value="sticker">Sticker Visa</option>
        </select>
        <select required>
          <option value="">Travellers</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3+</option>
        </select>

        {/* Form Footer */}
        <div className="form-footer">
          <span className="form-price">₹0</span>
          <button type="submit">APPLY NOW</button>
        </div>

        {/* Contact Options Grid */}
        <div className="contact-options-grid">
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-icon">📱</span>
              <div className="contact-info">
                <span className="title">Visa on WhatsApp</span>
                <span className="desc">+91 7506865623</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-icon">📞</span>
              <div className="contact-info">
                <span className="title">Call Us</span>
                <span className="desc">02240666444</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-icon">⏰</span>
              <div className="contact-info">
                <span className="title">Timing</span>
                <span className="desc">9am to 9pm</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-icon">📍</span>
              <div className="contact-info">
                <span className="title">Visit Office</span>
                <span className="desc">Near Crawford Market, Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VisaForm;
