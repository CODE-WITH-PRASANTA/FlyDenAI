import React from "react";
import { FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // IMPORTANT

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
  isSaving,
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
        {/* VISA TYPE + TRAVELLERS */}
        <div className="VisaApplicationForm__form-row">
          <div className="VisaApplicationForm__form-group">
            <label className="VisaApplicationForm__label">Visa Type</label>
            <select
              className="VisaApplicationForm__select"
              value={selectedVisaTypeIndex}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setSelectedVisaTypeIndex(idx);
                setVisaType(visaTypes[idx]?.name || "");
              }}
            >
              {visaTypes.map((vt, idx) => (
                <option key={idx} value={idx}>
                  {vt.name} {vt.fees ? ` - ₹${String(vt.fees).replace(/[^\d]/g, "")}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="VisaApplicationForm__form-group">
            <label className="VisaApplicationForm__label">Travellers</label>
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

        {/* PRICE BOX */}
        <div className="VisaApplicationForm__price-box">
          <div className="VisaApplicationForm__price-header">
            <h4 className="VisaApplicationForm__price-title">Total Estimated Cost</h4>
            <div className="VisaApplicationForm__price-main">
              <span className="VisaApplicationForm__price-amount">₹ {totalPayable}</span>
            </div>
          </div>

          <div className="VisaApplicationForm__price-breakdown">
            <span>💳 ₹{pricePerTraveller || "---"} × {travellers} – Base Fare</span>
            <span>🛠️ ₹1 – Service Charge</span>
            <span>🧾 ₹{taxAmount} – GST</span>
            {discountAmount > 0 && (
              <span className="VisaApplicationForm__discount">
                🎉 -₹{discountAmount} Discount Applied
              </span>
            )}
          </div>
        </div>

        {/* MODERN DATE PICKERS */}
        <div className="VisaApplicationForm__form-row">
          
          {/* ONWARD DATE */}
          <div className="VisaApplicationForm__form-group">
            <label className="VisaApplicationForm__label">Onward Date</label>
            <DatePicker
              selected={onwardDate}
              onChange={(date) => setOnwardDate(date)}
              className="VisaApplicationForm__date-modern"
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Onward Date"
              popperClassName="VisaDatePopper"
            />
          </div>

          {/* RETURN DATE */}
          <div className="VisaApplicationForm__form-group">
            <label className="VisaApplicationForm__label">Return Date</label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              className="VisaApplicationForm__date-modern"
              minDate={onwardDate || new Date()} // prevent selecting before onward
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Return Date"
              popperClassName="VisaDatePopper"
            />
          </div>

        </div>

        {/* NEXT BUTTON */}
        <div className="VisaApplicationForm__actions">
          <button
            className="VisaApplicationForm__btn VisaApplicationForm__btn--primary"
            onClick={handleNext}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : <>Continue <FaArrowRight /></>}
          </button>
        </div>

      </div>
    </section>
  );
};

export default Step1Itinerary;
