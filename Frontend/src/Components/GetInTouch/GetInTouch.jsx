import React from "react";
import "./GetInTouch.css";
import contactBg from "../../assets/cons.webp"; // background image

const GetInTouch = () => {
  return (
    <section className="GetInTouch-section">
      {/* Left Section with Background Image */}
      <div
        className="GetInTouch-left"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="GetInTouch-left-overlay"></div>
        <div className="GetInTouch-left-content">
          <h5 className="GetInTouch-subtitle">Get In Touch</h5>
          <h2 className="GetInTouch-title">We’re Here to Help You</h2>
          <p className="GetInTouch-text">
            Connect with our visa experts for reliable consultation and quick
            assistance. Whether you need help with documents, process timelines,
            or visa types — we’ve got you covered.
          </p>

          <div className="GetInTouch-info">
            <p>
              <strong>Email:</strong> support@visahelp.com
            </p>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p>
              <strong>Address:</strong> 123 Visa Street, City, Country
            </p>
          </div>
        </div>
      </div>

      {/* Right Section Form */}
      <div className="GetInTouch-right">
        <form className="GetInTouch-form">
          <h3 className="form-title">Send Us a Message</h3>

          <div className="form-row">
            <input type="text" placeholder="Your Full Name" required />
            <input type="email" placeholder="Your Email Address" required />
          </div>

          <div className="form-row">
            <input type="text" placeholder="Phone Number" required />
            <select defaultValue="">
              <option value="" disabled>
                Select Visa Category
              </option>
              <option value="student">Student Visa</option>
              <option value="business">Business Visa</option>
              <option value="tourist">Tourist Visa</option>
              <option value="work">Work Visa</option>
              <option value="permanent">Permanent Residency</option>
            </select>
          </div>

          <input type="text" placeholder="Subject" />
          <textarea placeholder="Write your message here..." required></textarea>

          <button type="submit" className="GetInTouch-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default GetInTouch;
