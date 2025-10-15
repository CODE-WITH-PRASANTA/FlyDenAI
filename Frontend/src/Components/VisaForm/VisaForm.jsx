import React from "react";
import "./VisaForm.css";

const VisaForm = () => {
  return (
    <div className="visa-application-form">
      <div className="form-header">
        ⏱️ It takes less than <strong>2 minutes</strong> to Apply
      </div>
      <form>
        <input type="email" placeholder="Email ID" required />
        <input type="tel" placeholder="Contact No" required />
        <select required>
          <option value="">Select Visa Type</option>
          <option value="mdac">Digital Arrival Card</option>
          <option value="sticker">Sticker Visa</option>
        </select>
        <select required>
          <option value="">Travellers</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3+</option>
        </select>
        <div className="form-footer">
          <span className="form-price">₹0</span>
          <button type="submit">APPLY NOW</button>
        </div>
      </form>
    </div>
  );
};

export default VisaForm;
