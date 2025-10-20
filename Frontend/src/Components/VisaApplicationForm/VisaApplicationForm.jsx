import React, { useState } from "react";
import "./VisaApplicationForm.css";
import {
  FaUser,
  FaCalendarAlt,
  FaArrowRight,
  FaPlaneDeparture,
  FaCreditCard,
  FaCheckCircle,
  FaFileUpload,
} from "react-icons/fa";

const VisaApplicationForm = () => {
  const [step, setStep] = useState(1);
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

  const progressSteps = [
    { label: "Itinerary", icon: <FaPlaneDeparture /> },
    { label: "Traveller Details", icon: <FaUser /> },
    { label: "Make Payment", icon: <FaCreditCard /> },
    { label: "Upload Documents", icon: <FaFileUpload /> },
  ];

  const handleNext = () => step < 5 && setStep(step + 1);
  const handlePrev = () => step > 1 && setStep(step - 1);

  return (
    <div className="visa-app-wrapper">
      {/* ====================== PROGRESS BAR ====================== */}
      <div className="visa-progress-container">
        <div className="progress-edge left-edge"></div>

        <div
          className="visa-progress-fill"
          style={{
            width:
              (step - 1) / (progressSteps.length - 1) < 1
                ? `${(step - 1) / (progressSteps.length - 1) * 100}%`
                : "auto",
          }}
        ></div>

        {progressSteps.map((item, index) => {
          const current = index + 1;
          return (
            <div
              key={index}
              className={`progress-step ${
                step === current
                  ? "active"
                  : step > current
                  ? "completed"
                  : ""
              }`}
            >
              <div className="progress-icon">{item.icon}</div>
              <span className="progress-label">{item.label}</span>
            </div>
          );
        })}

        <div className="progress-edge right-edge"></div>
      </div>

      {/* ====================== MAIN FORM SECTION ====================== */}
      <div className="visa-form-layout">
        <div className="visa-left-panel">
          {/* ========== STEP 1: Itinerary ========== */}
          {step === 1 && (
            <section className="visa-step fade-in">
              <h3 className="visa-step-title">Travel Itinerary</h3>
              <p className="visa-step-subtitle">
                Plan your travel dates and choose your visa type.
              </p>

              <div className="visa-form-group">
                <label>Visa Type</label>
                <select className="visa-input">
                  <option>Malaysia Digital Arrival Card (MDAC)</option>
                </select>
              </div>

              <div className="visa-row">
                <div className="visa-col">
                  <label>Onward Date</label>
                  <div className="visa-input-wrapper">
                    <FaCalendarAlt className="visa-input-icon" />
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="visa-input"
                    />
                  </div>
                </div>

                <div className="visa-col">
                  <label>Return Date</label>
                  <div className="visa-input-wrapper">
                    <FaCalendarAlt className="visa-input-icon" />
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="visa-input"
                    />
                  </div>
                </div>
              </div>

              <div className="visa-actions">
                <button className="visaapplication-btn primary" onClick={handleNext}>
                  Continue <FaArrowRight />
                </button>
              </div>
            </section>
          )}

          {/* ========== STEP 2: Traveller Details ========== */}
          {step === 2 && (
            <section className="visa-step fade-in">
              <h3 className="visa-step-title">Traveller Details</h3>
              <p className="visa-step-subtitle">
                Enter your personal and passport details carefully.
              </p>

              <div className="traveller-header">
                <FaUser /> <span>Primary Applicant</span>
              </div>

              <div className="visa-row">
                <div className="visa-col small">
                  <label>Title</label>
                  <select className="visa-input">
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>
                <div className="visa-col">
                  <label>First Name</label>
                  <input type="text" className="visa-input" />
                </div>
                <div className="visa-col">
                  <label>Last Name</label>
                  <input type="text" className="visa-input" />
                </div>
              </div>

              <div className="visa-row">
                <div className="visa-col">
                  <label>Date of Birth</label>
                  <div className="visa-input-wrapper">
                    <FaCalendarAlt className="visa-input-icon" />
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="visa-input"
                    />
                  </div>
                </div>
                <div className="visa-col">
                  <label>Nationality</label>
                  <input
                    type="text"
                    className="visa-input readonly"
                    value="Indian"
                    readOnly
                  />
                </div>
              </div>

              <div className="visa-row">
                <div className="visa-col">
                  <label>Passport No</label>
                  <input type="text" className="visa-input" />
                </div>
                <div className="visa-col">
                  <label>Contact Number</label>
                  <input type="text" className="visa-input" />
                </div>
              </div>

              <div className="visa-actions">
                <button className="visaapplication-btn outline" onClick={handlePrev}>
                  Back
                </button>
                <button className="visaapplication-btn primary" onClick={handleNext}>
                  Continue <FaArrowRight />
                </button>
              </div>
            </section>
          )}

          {/* ========== STEP 3: Payment ========== */}
          {step === 3 && (
            <section className="visa-step fade-in">
              <h3 className="visa-step-title">Make Payment</h3>
              <p className="visa-step-subtitle">
                Choose your preferred payment method.
              </p>

              <div className="payment-options">
                {paymentOptions.map((option) => (
                  <div
                    key={option}
                    className={`payment-option ${
                      activePayment === option ? "active" : ""
                    }`}
                    onClick={() => setActivePayment(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <div className="payment-box">
                <h4>{activePayment} Payment</h4>
                <p>
                  {activePayment === "UPI"
                    ? "Scan the QR code or enter your Virtual Payment Address."
                    : `Enter your ${activePayment} details to proceed.`}
                </p>

                <div className="payment-footer">
                  <span>
                    Total payable amount: <strong>₹748</strong>
                  </span>
                 <button className="visaapplication-btn pay" onClick={handleNext}>
                    Pay Now <FaArrowRight />
                  </button>

                </div>
              </div>
            </section>
          )}

          {/* ========== STEP 4: Upload Documents ========== */}
          {step === 4 && (
            <section className="visa-step fade-in">
              <h3 className="visa-step-title">Upload Documents</h3>
              <p className="visa-step-subtitle">
                Upload clear scanned copies of your required documents.
              </p>

              <div className="VisaApplicationForm-uploadgrid">
                {[
                  "Passport Copy",
                  "Photo",
                  "Travel Itinerary",
                  "Additional Document",
                ].map((label) => (
                  <div key={label} className="upload-box">
                    <label>{label}</label>
                    <input type="file" className="upload-input" />
                  </div>
                ))}
              </div>

              <div className="visa-actions">
                <button className="visaapplication-btn outline" onClick={handlePrev}>
                  Back
                </button>
                <button className="visaapplication-btn primary" onClick={handleNext}>
                  Submit Documents
                </button>
              </div>
            </section>
          )}

          {/* ========== STEP 5: Thank You ========== */}
          {step === 5 && (
            <section className="visa-step fade-in thankyou-section">
              <FaCheckCircle className="thank-icon" />
              <h2>Thank You! 🎉</h2>
              <p>Your Malaysia Visa Application has been submitted successfully.</p>
              <button className="visaapplication-btn primary" onClick={() => setStep(1)}>
                Apply Another Visa
              </button>
            </section>
          )}
        </div>

        {/* ====================== RIGHT SIDEBAR ====================== */}
        <aside className="visa-right-panel">
          <div className="fare-summary-card">
            <h4>Fare Details</h4>
            <div className="fare-item">
              <span>Base Fare</span>
              <span>₹249.00</span>
            </div>
            <div className="fare-item">
              <span>Service Charges</span>
              <span>₹250.00</span>
            </div>
            <div className="fare-item">
              <span>Taxes</span>
              <span>₹249.00</span>
            </div>
            <div className="fare-total">
              <span>Total</span>
              <span>₹748.00</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VisaApplicationForm;
