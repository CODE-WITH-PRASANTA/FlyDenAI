import React, { useState } from "react";
import "./StudyAbroadBanner.css";
import bgImage from "../../assets/slider2.webp"; // Make sure this path is correct

function StudyAbroadBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log(formData);
  };

  return (
    <div
      className="StudyAbroadBanner-app"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="StudyAbroadBanner-overlay">
        <div className="StudyAbroadBanner-left">
          <h1>
            Take the First Step to <br />
            <span>STUDY ABROAD</span>
          </h1>
          <ul>
            <li>✅ Courses starting from ₹8 Lakhs*</li>
            <li>✅ Scholarship worth ₹10,00,000*</li>
            <li>✅ Offer letter in less than 48 hours*</li>
          </ul>
        </div>

        <div className="StudyAbroadBanner-right">
          <form className="StudyAbroadBanner-form" onSubmit={handleSubmit}>
            <h2>Start your Study Abroad Journey</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name*"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email Address*"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="StudyAbroadBanner-phone">
              <span>🇮🇳 +91</span>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile number*"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="pincode"
              placeholder="Pincode*"
              value={formData.pincode}
              onChange={handleChange}
              required
            />

            <label className="StudyAbroadBanner-checkbox">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                required
              />
              <span>
                I have read and agreed to <a href="#">terms & privacy policy</a>
              </span>
            </label>

            <button type="submit">Book your free consultation</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudyAbroadBanner;
