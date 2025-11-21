import React from "react";
import CouponBox from "./CouponBox";
import { SERVICE_CHARGE } from "./VisaApplicationForm";

const SummarySidebar = ({
  baseFare,
  taxAmount,
  discountAmount,
  totalPayable,
  couponCode,
  setCouponCode,
  appliedCoupon,
  applyCoupon,
  showCouponInput,
  setShowCouponInput,
}) => {
  return (
    <aside className="VisaApplicationForm__sidebar">
      <div className="VisaApplicationForm__fare-card">
        <h4 className="VisaApplicationForm__fare-title">Fare Summary</h4>
        <div className="VisaApplicationForm__fare-row">
          <span>Base Fare</span>
          <span>₹{baseFare}</span>
        </div>
        <div className="VisaApplicationForm__fare-row">
          <span>Service Charge</span>
          <span>₹{SERVICE_CHARGE}</span>
        </div>
        <div className="VisaApplicationForm__fare-row">
          <span>GST (18%)</span>
          <span>₹{taxAmount}</span>
        </div>
        <div className="VisaApplicationForm__fare-row">
          <span>Discount</span>
          <span>-₹{discountAmount}</span>
        </div>
        <div className="VisaApplicationForm__fare-total">
          <span>Total</span>
          <span>₹ {totalPayable}</span>
        </div>
      </div>

      <CouponBox
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        appliedCoupon={appliedCoupon}
        applyCoupon={applyCoupon}
        showCouponInput={showCouponInput}
        setShowCouponInput={setShowCouponInput}
      />

      <div className="VisaApplicationForm__help-card">
        <h5 className="VisaApplicationForm__help-title">Need Help?</h5>
        <p className="VisaApplicationForm__help-text">
          For support, contact our team with your application details.
        </p>
        <button className="VisaApplicationForm__btn VisaApplicationForm__btn--outline">
          Contact Support
        </button>
      </div>
    </aside>
  );
};

export default SummarySidebar;
