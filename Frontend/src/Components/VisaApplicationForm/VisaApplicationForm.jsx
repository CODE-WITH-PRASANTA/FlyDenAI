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

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressSteps = [
    { label: "Itinerary", icon: <FaPlaneDeparture /> },
    { label: "Traveller Details", icon: <FaUser /> },
    { label: "Make Payment", icon: <FaCreditCard /> },
    { label: "Upload Documents", icon: <FaFileUpload /> },
  ];

  return (
    <div className="visa-application-container">
      {/* ======= PROGRESS BAR ======= */}
      <div className="visa-application-progress">
        {progressSteps.map((item, index) => {
          const currentStep = index + 1;
          return (
            <div
              key={index}
              className={`visa-progress-step ${
                step === currentStep
                  ? "active"
                  : step > currentStep
                  ? "completed"
                  : ""
              }`}
            >
              <div className="progress-circle">{item.icon}</div>
              <span className="progress-label">{item.label}</span>
              {index < progressSteps.length - 1 && (
                <div className="progress-line"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* ======= MAIN GRID ======= */}
      <div className="visa-application-grid">
        <div className="visa-application-left">
          {/* Step 1 - Itinerary */}
          {step === 1 && (
            <div className="visa-application-section fade-in">
              <h3 className="section-title">Travel Itinerary</h3>
              <p className="section-subtitle">
                Plan your travel dates and choose your arrival card type.
              </p>

              <div className="form-row">
                <div className="form-col full">
                  <label>Visa Type</label>
                  <select className="form-input">
                    <option>Malaysia Digital Arrival Card (MDAC)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col half">
                  <label>Onward Date</label>
                  <div className="input-wrapper">
                    <FaCalendarAlt className="input-icon" />
                    <input type="text" placeholder="dd/mm/yyyy" />
                  </div>
                </div>
                <div className="form-col half">
                  <label>Return Date</label>
                  <div className="input-wrapper">
                    <FaCalendarAlt className="input-icon" />
                    <input type="text" placeholder="dd/mm/yyyy" />
                  </div>
                </div>
              </div>

              <button className="continue-btn" onClick={handleNext}>
                Continue <FaArrowRight />
              </button>
            </div>
          )}

          {/* Step 2 - Traveller Details */}
          {step === 2 && (
            <div className="visa-application-section fade-in">
              <h3 className="section-title">Traveller Details</h3>
              <p className="section-subtitle">
                Enter your personal and passport information carefully.
              </p>

              <div className="traveller-info">
                <FaUser /> <span>Primary Applicant</span>
              </div>

              <div className="form-row">
                <div className="form-col third">
                  <label>Title</label>
                  <select>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>
                <div className="form-col third">
                  <label>First Name</label>
                  <input type="text" />
                </div>
                <div className="form-col third">
                  <label>Last Name</label>
                  <input type="text" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col half">
                  <label>Date of Birth</label>
                  <div className="input-wrapper">
                    <FaCalendarAlt className="input-icon" />
                    <input type="text" placeholder="dd/mm/yyyy" />
                  </div>
                </div>
                <div className="form-col half">
                  <label>Nationality</label>
                  <input type="text" value="Indian" readOnly />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col half">
                  <label>Passport No</label>
                  <input type="text" />
                </div>
                <div className="form-col half">
                  <label>Contact Number</label>
                  <input type="text" />
                </div>
              </div>

              <div className="form-actions between">
                <button className="continue-btn outline" onClick={handlePrev}>
                  Back
                </button>
                <button className="continue-btn" onClick={handleNext}>
                  Continue <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Payment */}
          {step === 3 && (
            <div className="visa-application-section fade-in">
              <h3 className="section-title">Make Payment</h3>
              <p className="section-subtitle">
                Select your preferred payment method and complete your payment.
              </p>

              <div className="payment-options-grid">
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

              <div className="payment-content">
                <h4>{activePayment} Payment</h4>
                <p>
                  {activePayment === "UPI"
                    ? "Scan the QR code or enter your Virtual Payment Address."
                    : `Enter your ${activePayment} details to proceed.`}
                </p>

                <div className="payment-footer">
                  <span>
                    Total payable amount <strong>₹748</strong>
                  </span>
                  <button className="pay-btn" onClick={handleNext}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Upload Documents */}
          {step === 4 && (
            <div className="visa-application-section fade-in">
              <h3 className="section-title">Upload Documents</h3>
              <p className="section-subtitle">
                Please upload clear scanned copies of the required documents.
              </p>

              <div className="upload-grid">
                {["Passport Copy", "Photo", "Travel Itinerary", "Additional Document"].map(
                  (label) => (
                    <div className="upload-box" key={label}>
                      <label>{label}</label>
                      <input type="file" />
                    </div>
                  )
                )}
              </div>

              <div className="form-actions between">
                <button className="continue-btn outline" onClick={handlePrev}>
                  Back
                </button>
                <button className="continue-btn" onClick={handleNext}>
                  Submit Documents
                </button>
              </div>
            </div>
          )}

          {/* Step 5 - Thank You */}
          {step === 5 && (
            <div className="thank-you-section fade-in">
              <FaCheckCircle className="thank-icon" />
              <h2>Thank You! 🎉</h2>
              <p>
                Your Malaysia Visa Application has been submitted successfully.
                We’ll update you via email once it’s processed.
              </p>
              <button className="continue-btn" onClick={() => setStep(1)}>
                Apply Another Visa
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="visa-application-right sticky-right">
          <div className="fare-box">
            <h4>Fare Details</h4>
            <div className="fare-line">
              <span>Base Fare</span>
              <span>₹249.00</span>
            </div>
            <div className="fare-line">
              <span>Service Charges</span>
              <span>₹250.00</span>
            </div>
            <div className="fare-line">
              <span>Taxes</span>
              <span>₹249.00</span>
            </div>
            <div className="fare-total">
              <span>Total</span>
              <span>₹748.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationForm;
