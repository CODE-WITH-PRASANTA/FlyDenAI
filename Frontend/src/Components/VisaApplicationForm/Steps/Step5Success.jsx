import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Step5Success = ({ resetForm }) => {
  return (
    <section className="VisaApplicationForm__step VisaApplicationForm__step--thankyou">

      {/* Success Icon */}
      <div className="success-icon-wrapper">
        <FaCheckCircle className="success-icon" />
      </div>

      {/* Title */}
      <h2 className="success-title">Thank You! 🎉</h2>
      <p className="success-subtitle">
        Your visa application has been submitted successfully.
      </p>

      {/* Highlighted Card */}
      <div className="success-card">
        <h3>🎯 What Happens Next?</h3>
        <p>
          Our visa experts are now reviewing your submitted documents.  
          You will receive updates on your registered <strong>email</strong> and
          <strong> WhatsApp number</strong>.
        </p>
        <p>
          Please keep your <strong>Application ID</strong> safe.  
          You can track your visa status anytime on our website.
        </p>
      </div>

      {/* Button */}
      <div className="success-actions">
        <button className="success-btn" onClick={resetForm}>
          Apply for Another Visa
        </button>
      </div>

    </section>
  );
};

export default Step5Success;
