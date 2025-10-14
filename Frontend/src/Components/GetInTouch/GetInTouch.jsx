import React from 'react';
import './GetInTouch.css';
import contactBg from '../../assets/cons.webp'; // background image

const GetInTouch = () => {
  return (
    <section className="git-section">
      {/* Left Section with Background Image */}
      <div
        className="git-left"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="git-left-overlay"></div>
        <div className="git-left-content">
          <h5 className="git-subtitle">Get In Touch</h5>
          <h2 className="git-title">We’re Here to Help You</h2>
          <p className="git-text">
            Reach out to us for consultations regarding visa and immigration services.
            Our experts will guide you through every step efficiently.
          </p>
          <div className="git-info">
            <p><strong>Email:</strong> support@visahelp.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Address:</strong> 123 Visa Street, City, Country</p>
          </div>
        </div>
      </div>

      {/* Right Section Form */}
      <div className="git-right">
        <form className="git-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Write your message"></textarea>
          <button type="submit" className="git-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default GetInTouch;
