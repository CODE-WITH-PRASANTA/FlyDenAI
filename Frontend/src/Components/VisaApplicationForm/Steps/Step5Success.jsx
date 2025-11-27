import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Step5Success = ({ resetForm }) => {
  return (
    <section className="VisaApplicationForm__step VisaApplicationForm__step--thankyou">
      <div className="VisaApplicationForm__thank-icon"><FaCheckCircle /></div>
      <h2 className="VisaApplicationForm__title VisaApplicationForm__title--center">Thank You! 🎉</h2>
      <p className="VisaApplicationForm__subtitle VisaApplicationForm__subtitle--center">Your visa application has been submitted successfully.</p>

      <div className="VisaApplicationForm__actions VisaApplicationForm__actions--center">
        <button className="VisaApplicationForm__btn VisaApplicationForm__btn--primary" onClick={resetForm}>Apply Another Visa</button>
      </div>
    </section>
  );
};

export default Step5Success;
