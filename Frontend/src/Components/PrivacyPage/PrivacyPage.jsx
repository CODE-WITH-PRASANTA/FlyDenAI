import React from 'react';
import './PrivacyPage.css';
import privacyImg from "../../assets/term-img.webp";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        {/* LEFT COLUMN */}
        <div className="privacy-left">
          <div className="privacy-page-text">
            <h1>Privacy  Policy</h1>
            <p>
              At RoadTripRent, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal
              information when you use our services or visit our website. Please review the policies to understand how we handle your data.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>1. Information We Collect:</h2>
            <p>We may collect personal information including your name, contact details, driver's license, payment info, and rental history.</p>
          </div>

          <div className="privacy-page-item">
            <h2>2. Use of Information:</h2>
            <p>Your data helps us facilitate rentals, improve services, provide support, and prevent fraud.</p>
          </div>

          <div className="privacy-page-item">
            <h2>3. Sharing Your Data:</h2>
            <p>We do not sell your data. Trusted third parties may access it when required, e.g., payment processors, insurers, or authorities.</p>
          </div>

          <div className="privacy-page-item">
            <h2>4. Data Retention:</h2>
            <p>We retain your information only as long as needed for the purposes described unless legally required otherwise.</p>
          </div>

          <div className="privacy-page-item">
            <h2>5. Cookies & Tracking:</h2>
            <p>Cookies enhance user experience and collect analytics. You can manage them in your browser settings.</p>
          </div>

                 <div className="privacy-page-item">
            <h2>6. Security Measures:</h2>
            <p>We use industry-standard security to protect your data. No internet transmission is 100% secure.</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="privacy-right">


          <img src={privacyImg} alt="Privacy Illustration" />

   

          <div className="privacy-page-item">
            <h2>7. Your Rights:</h2>
            <p>You can access, correct, or delete your data and object to processing. Contact us for assistance.</p>
          </div>

          <div className="privacy-page-item">
            <h2>8. Third-Party Links:</h2>
            <p>We are not responsible for external websites’ privacy practices or content.</p>
          </div>

          <div className="privacy-page-item">
            <h2>9. Policy Updates:</h2>
            <p>Updates to this policy will be posted here with a revision date.</p>
          </div>

          <div className="privacy-page-item">
            <h2>10. Contact Us:</h2>
            <p>Questions? Reach out to our support team for assistance regarding privacy practices.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="privacy-footer">
        <p>
          By using our website and services, you acknowledge that you have read, understood, and agree to this Privacy Policy.
          If you do not agree with any part of this policy, please refrain from using our services.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
