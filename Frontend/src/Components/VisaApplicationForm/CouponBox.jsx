import React from "react";
import { FaPlus } from "react-icons/fa";

const CouponBox = ({
  couponCode,
  setCouponCode,
  appliedCoupon,
  applyCoupon,
  showCouponInput,
  setShowCouponInput,
}) => {
  return (
    <div className="VisaApplicationForm__coupon-card">
      <div className="VisaApplicationForm__coupon-header">
        <span>Have a discount coupon?</span>
        <button
          onClick={() => setShowCouponInput((v) => !v)}
          className="VisaApplicationForm__btn"
        >
          <FaPlus />
        </button>
      </div>

      {showCouponInput && (
        <div className="VisaApplicationForm__coupon-body">
          <div className="VisaApplicationForm__coupon-input-wrapper">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="VisaApplicationForm__input VisaApplicationForm__input--coupon"
            />
          </div>
          <button
            onClick={applyCoupon}
            className="VisaApplicationForm__btn--apply"
          >
            {appliedCoupon ? "Remove Coupon" : "Apply"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponBox;
