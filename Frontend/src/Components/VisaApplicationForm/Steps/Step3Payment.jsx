import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Step3Payment = ({ totalPayable, handlePayment, handlePrev }) => {
  return (
    <section className="VisaApplicationForm__step VisaApplicationForm__step--payment">
      <div className="VisaApplicationForm__section-head">
        <h3 className="VisaApplicationForm__title">Secure Payment via PhonePe</h3>
        <p className="VisaApplicationForm__subtitle">
          You will be redirected to PhonePe to complete your UPI payment.
        </p>
      </div>

      <div className="VisaApplicationForm__upi-box">
        <div className="VisaApplicationForm__upi-content">
          <p className="VisaApplicationForm__upi-desc">
            Total Payable Amount:
          </p>
          <div className="VisaApplicationForm__upi-summary">
            <span>₹ {totalPayable}</span>
          </div>

          <button
            className="VisaApplicationForm__btn VisaApplicationForm__btn--primary VisaApplicationForm__btn--pay"
            onClick={handlePayment}
          >
            Pay Now <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="VisaApplicationForm__actions">
        <button
          className="VisaApplicationForm__btn VisaApplicationForm__btn--outline"
          onClick={handlePrev}
        >
          Back
        </button>
      </div>
    </section>
  );
};

export default Step3Payment;
