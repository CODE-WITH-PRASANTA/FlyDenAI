import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Step3Payment = ({
  totalPayable,
  handlePayment,
  handlePrev,
  paymentStatus,
  isInitiatingPayment,
  handleNext, // in case you want a "Save & Pay" flow
}) => {
  return (
    <section className="VisaApplicationForm__step VisaApplicationForm__step--payment">
      <div className="VisaApplicationForm__section-head">
        <h3 className="VisaApplicationForm__title">Secure Payment via PhonePe</h3>
        <p className="VisaApplicationForm__subtitle">You will be redirected to complete payment.</p>
      </div>

      <div style={{ marginBottom: "15px" }}>
        {paymentStatus === "SUCCESS" && (
          <div style={{ background: "#e6ffef", padding: "12px", borderRadius: "6px", color: "#0f7a35", marginBottom: "10px", fontWeight: 600 }}>
            ✅ Payment Completed Successfully!
          </div>
        )}
        {paymentStatus === "FAILED" && (
          <div style={{ background: "#ffe8e8", padding: "12px", borderRadius: "6px", color: "#a12626", marginBottom: "10px", fontWeight: 600 }}>
            ❌ Payment Failed. Please try again.
          </div>
        )}
        {paymentStatus === "PENDING" && (
          <div style={{ background: "#fff8e1", padding: "12px", borderRadius: "6px", color: "#7f6000", marginBottom: "10px", fontWeight: 600 }}>
            ⚠ Payment Pending. Please complete the payment.
          </div>
        )}
      </div>

      <div className="VisaApplicationForm__upi-box">
        <div className="VisaApplicationForm__upi-content">
          <p className="VisaApplicationForm__upi-desc">Total Payable Amount:</p>

          <div className="VisaApplicationForm__upi-summary">
            <span>₹ {totalPayable}</span>
          </div>

          <button
            className="VisaApplicationForm__btn VisaApplicationForm__btn--primary VisaApplicationForm__btn--pay"
            onClick={handlePayment}
            disabled={paymentStatus === "SUCCESS" || isInitiatingPayment}
          >
            {paymentStatus === "SUCCESS"
              ? "Already Paid"
              : isInitiatingPayment
              ? "Processing..."
              : <>Pay Now <FaArrowRight /></>}
          </button>
        </div>
      </div>

      <div className="VisaApplicationForm__actions">
        <button className="VisaApplicationForm__btn VisaApplicationForm__btn--outline" onClick={handlePrev}>
          Back
        </button>
      </div>
    </section>
  );
};

export default Step3Payment;
