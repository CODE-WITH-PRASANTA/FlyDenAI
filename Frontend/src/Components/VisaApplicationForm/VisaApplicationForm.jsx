import React, { useState } from "react";
import "./VisaApplicationForm.css";
import { FaUser, FaCalendarAlt, FaArrowRight, FaPlaneDeparture } from "react-icons/fa";

const VisaApplicationForm = () => {
  const [activePayment, setActivePayment] = useState("UPI");

  const paymentOptions = [
    "UPI",
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "Wallet",
    "PhonePe",
    "Google Pay",
    "AMEX",
  ];

  return (
    <div className="visa-application-container">
      {/* ======= PROGRESS BAR ======= */}
      <div className="visa-application-progress">
        <div className="visa-application-step active">
          <div className="step-circle">1</div>
          <span className="step-label">Itinerary</span>
          <div className="step-arrow"><FaArrowRight /></div>
        </div>
        <div className="visa-application-step">
          <div className="step-circle">2</div>
          <span className="step-label">Traveller Details</span>
          <div className="step-arrow"><FaArrowRight /></div>
        </div>
        <div className="visa-application-step">
          <div className="step-circle">3</div>
          <span className="step-label">Make Payment</span>
          <div className="step-arrow"><FaArrowRight /></div>
        </div>
        <div className="visa-application-step">
          <div className="step-circle">4</div>
          <span className="step-label">Upload Documents</span>
        </div>
      </div>

      {/* ======= FORM GRID ======= */}
      <div className="visa-application-grid">
        {/* LEFT COLUMN */}
        <div className="visa-application-left">
          {/* ================= SECTION 1: Itinerary ================= */}
          <div className="visa-application-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h3>Itinerary</h3>
            </div>

            <div className="form-row">
              <div className="form-col full">
                <label className="form-label">Malaysia Digital Arrival Card (MDAC)</label>
                <div className="input-wrapper">
                  <select className="form-input">
                    <option>Malaysia Digital Arrival Card (MDAC)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col half">
                <label className="form-label">Onward Date</label>
                <div className="input-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input type="text" placeholder="dd/mm/yyyy" className="form-input" />
                </div>
              </div>
              <div className="form-col half">
                <label className="form-label">Return Date</label>
                <div className="input-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input type="text" placeholder="dd/mm/yyyy" className="form-input" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTION 2: Traveller Details ================= */}
          <div className="visa-application-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h3>Traveller Details</h3>
            </div>

            <div className="traveller-label">
              <FaUser className="traveller-icon" />
              <span>Primary Applicant</span>
            </div>

            <div className="form-row">
              <div className="form-col third">
                <label className="form-label">Title</label>
                <div className="input-wrapper">
                  <select className="form-input">
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>
              </div>
              <div className="form-col third">
                <label className="form-label">First Name</label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" />
                </div>
              </div>
              <div className="form-col third">
                <label className="form-label">Last Name</label>
                <div className="input-wrapper">
                  <input type="text" className="form-input" />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col half">
                <label className="form-label">Date of Birth</label>
                <div className="input-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input type="text" placeholder="dd/mm/yyyy" className="form-input" />
                </div>
              </div>
              <div className="form-col half">
                <label className="form-label">Nationality</label>
                <input type="text" value="Indian" readOnly className="form-input readonly" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col half">
                <label className="form-label">Passport No</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-col half">
                <label className="form-label">Contact Number</label>
                <input type="text" placeholder="1111111111" className="form-input" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col half">
                <label className="form-label">Email ID</label>
                <input type="email" placeholder="example@gmail.com" className="form-input" />
              </div>
              <div className="form-col half">
                <label className="form-label">Optional Info</label>
                <input type="text" placeholder="Additional Info" className="form-input" />
              </div>
            </div>

            <div className="form-checks">
              <label><input type="checkbox" /> I need a business GST invoice</label>
            </div>

            <div className="form-actions">
              <label><input type="checkbox" defaultChecked /> I accept the rules of this trip</label>
              <button className="continue-btn">Continue <FaPlaneDeparture /></button>
            </div>
          </div>

          {/* ================= SECTION 3: Make Payment ================= */}
          <div className="visa-application-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h3>Make Payment</h3>
            </div>

            <div className="payment-options-grid">
              {paymentOptions.map((option) => (
                <div
                  key={option}
                  className={`payment-option ${activePayment === option ? "active" : ""}`}
                  onClick={() => setActivePayment(option)}
                >
                  {option}
                </div>
              ))}
            </div>

            <div className="payment-content">
              <h4>{activePayment} Payment</h4>
              <p>
                {activePayment === "UPI"
                  ? "Scan the QR code with your UPI app or enter your Virtual Payment Address."
                  : `Enter your ${activePayment} details to proceed.`}
              </p>

              {activePayment === "UPI" && (
                <div className="upi-icons">
                  <img src="/path-to-icons/phonepe.png" alt="PhonePe" />

                </div>
              )}

              {activePayment === "UPI" && (
                <div className="virtual-address">
                  <label>Virtual Payment Address</label>
                  <input type="text" placeholder="Enter your VPA" />
                </div>
              )}

              <div className="payment-footer">
                <span>Total payable amount <strong>₹748</strong></span>
                <button className="pay-btn">Pay Now</button>
              </div>
            </div>
          </div>

          {/* ================= SECTION 4: Upload Documents ================= */}
          <div className="visa-application-section">
            <div className="section-header">
              <div className="section-number">4</div>
              <h3>Upload Documents</h3>
            </div>

            <div className="upload-instructions">
              <p>Please upload the required documents to complete your visa application.</p>
            </div>

            <div className="upload-grid">
              <div className="upload-box">
                <label>Passport Copy</label>
                <input type="file" />
              </div>
              <div className="upload-box">
                <label>Photo</label>
                <input type="file" />
              </div>
              <div className="upload-box">
                <label>Travel Itinerary</label>
                <input type="file" />
              </div>
              <div className="upload-box">
                <label>Additional Document</label>
                <input type="file" />
              </div>
            </div>

            <div className="upload-footer">
              <button className="continue-btn">Submit Documents</button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="visa-application-right">
          <div className="fare-box">
            <h4>Fare Details</h4>
            <div className="fare-line"><span>Base Fare</span><span>₹0.00</span></div>
            <div className="fare-line"><span>Surcharges & Taxes</span><span>₹499.00</span></div>
            <div className="fare-total"><span>Total</span><span>₹499.00</span></div>
            <p className="fare-note">Fare BreakUp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationForm;
