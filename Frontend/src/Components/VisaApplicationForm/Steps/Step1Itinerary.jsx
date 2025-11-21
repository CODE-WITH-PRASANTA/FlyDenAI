import React from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { SERVICE_CHARGE } from "../VisaApplicationForm";

const Step1Itinerary = ({
  visaTypes,
  selectedVisaTypeIndex,
  setSelectedVisaTypeIndex,
  setVisaType,
  travellers,
  setTravellers,
  pricePerTraveller,
  baseFare,
  taxAmount,
  discountAmount,
  totalPayable,
  onwardDate,
  setOnwardDate,
  returnDate,
  setReturnDate,
  handleNext,
}) => {
  return (
    <section className="VisaApplicationForm__step VisaApplicationForm__step--itinerary">
      <div className="VisaApplicationForm__section-head">
        <h3 className="VisaApplicationForm__title">Travel Itinerary</h3>
        <p className="VisaApplicationForm__subtitle">
          Select visa type and traveller count.
        </p>
      </div>

      <div className="VisaApplicationForm__form">
        <div className="VisaApplicationForm__form-row">
          <div className="VisaApplicationForm__form-group">
            <label className="VisaApplicationForm__label">Visa Type</label>
            <select
              className="VisaApplicationForm__select"
              value={selectedVisaTypeIndex}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setSelectedVisaTypeIndex(idx);
                const selected = visaTypes[idx];
                setVisaType(selected?.name || "");
              }}
            >
              {visaTypes.length === 0 && (
                <option value={0}>No visa types available</option>
              )}
              {visaTypes.map((vt, idx) => (
                <option key={idx} value={idx}>
                  {vt.name}
                  {vt.fees ? ` - ₹${String(vt.fees).replace(/[^\d.]/g, "")}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="VisaApplicationForm__form-group">
            <label className="VisaApplicationForm__label">No. of Travellers</label>
            <select
              className="VisaApplicationForm__select"
              value={travellers}
              onChange={(e) => setTravellers(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option value={n} key={n}>
                  {n} Traveller{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="VisaApplicationForm__price-box">
          <div className="VisaApplicationForm__price-header">
            <h4 className="VisaApplicationForm__price-title">Total Estimated Cost</h4>
            <div className="VisaApplicationForm__price-main">
              <span className="VisaApplicationForm__price-amount">
                ₹ {totalPayable}
              </span>
            </div>
          </div>

          <div className="VisaApplicationForm__price-breakdown">
            <span>
              💳 ₹{pricePerTraveller} × {travellers} - Base Fare
            </span>
            <span>🛠️ ₹{SERVICE_CHARGE} - Service Charge</span>
            <span>🧾 ₹{taxAmount} - GST (18%)</span>
            {discountAmount > 0 && (
              <span className="VisaApplicationForm__discount">
                🎉 -₹{discountAmount} - Discount Applied
              </span>
            )}
          </div>
        </div>

        <div className="VisaApplicationForm__form-row">
          <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--date">
            <label className="VisaApplicationForm__label">Onward Date</label>
            <div className="VisaApplicationForm__input-with-icon">
              <FaCalendarAlt className="VisaApplicationForm__input-icon" />
              <input
                className="VisaApplicationForm__input"
                type="date"
                value={onwardDate}
                onChange={(e) => setOnwardDate(e.target.value)}
              />
            </div>
          </div>

          <div className="VisaApplicationForm__form-group VisaApplicationForm__form-group--date">
            <label className="VisaApplicationForm__label">Return Date</label>
            <div className="VisaApplicationForm__input-with-icon">
              <FaCalendarAlt className="VisaApplicationForm__input-icon" />
              <input
                className="VisaApplicationForm__input"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="VisaApplicationForm__actions">
          <button
            className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
            onClick={handleNext}
          >
            Continue <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Step1Itinerary;
