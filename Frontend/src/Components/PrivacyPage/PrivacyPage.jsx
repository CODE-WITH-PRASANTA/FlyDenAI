import React from 'react';
import './PrivacyPage.css';
import privacyImg from "../../assets/v6.webp";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        {/* LEFT COLUMN */}
        <div className="privacy-left">
          <div className="privacy-page-text">
            <h1>Privacy Policy</h1>
            <p>
              At FlyDenAi, we prioritize your privacy. This Privacy Policy outlines how we collect, use, and protect your personal
              information when you use our Visa, Study Abroad, and Intern Abroad services or visit our website. Please read carefully
              to understand how we handle your data.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>1. Information We Collect:</h2>
            <p>We collect personal information such as your name, contact details, passport information, academic records, internship preferences, and payment details to provide our services.</p>
          </div>

          <div className="privacy-page-item">
            <h2>2. Use of Information:</h2>
            <p>Your data is used to process visa applications, facilitate study abroad programs, match you with suitable internships, provide customer support, and improve our services.</p>
          </div>

          <div className="privacy-page-item">
            <h2>3. Sharing Your Data:</h2>
            <p>We do not sell your personal information. Trusted third parties such as visa authorities, educational institutions, or internship partners may access your data when required to provide services.</p>
          </div>

          <div className="privacy-page-item">
            <h2>4. Data Retention:</h2>
            <p>We retain your personal information only as long as necessary to provide services or comply with legal obligations.</p>
          </div>

          <div className="privacy-page-item">
            <h2>5. Cookies & Tracking:</h2>
            <p>Cookies help us enhance your online experience, track website analytics, and remember your preferences. You can manage cookies through your browser settings.</p>
          </div>

          <div className="privacy-page-item">
            <h2>6. Security Measures:</h2>
            <p>We implement industry-standard security measures to protect your information. However, no method of online transmission is completely secure.</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="privacy-right">
          <img src={privacyImg} alt="Privacy Illustration" />

          <div className="privacy-page-item">
            <h2>7. Your Rights:</h2>
            <p>You can request access to, correction, or deletion of your personal data. You may also object to certain processing activities. Contact us for assistance.</p>
          </div>

          <div className="privacy-page-item">
            <h2>8. Third-Party Links:</h2>
            <p>Our website may contain links to external services such as educational institutions or visa authorities. We are not responsible for the privacy practices of these external sites.</p>
          </div>

          <div className="privacy-page-item">
            <h2>9. Policy Updates:</h2>
            <p>We may update this Privacy Policy periodically. Any changes will be posted on this page with a revision date. Please check regularly.</p>
          </div>

          <div className="privacy-page-item">
            <h2>10. Contact Us:</h2>
            <p>If you have questions or concerns about your privacy or our data handling practices, please contact our support team for assistance.</p>
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
