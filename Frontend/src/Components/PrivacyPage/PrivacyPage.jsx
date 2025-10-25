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
              At FlyDenAi, your trust is our top priority. We act as a professional consultant to guide you in obtaining visas, study abroad opportunities, and internship placements. We do not provide visas or educational placements directly; instead, we help you navigate the process efficiently and securely. This Privacy Policy explains how we collect, use, and protect your information while using our services or visiting our website.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>1. Information We Collect</h2>
            <p>
              We collect personal information including your name, contact details, passport information, academic records, internship preferences, and payment details. This helps us provide guidance, prepare your documents, and streamline the visa, study abroad, or internship application process.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>2. How We Use Your Information</h2>
            <p>
              Your information is used solely to provide consulting services, guide you through visa and study abroad applications, match you with suitable internships, assist with document preparation, and ensure smooth communication. We also use your data to enhance your experience and improve our services.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>3. Payment Information</h2>
            <p>
              Any payment you make for our consultancy services is processed securely via trusted payment gateways. We do not store your payment card information. Payment details are handled directly by our gateway partners, ensuring safety and transparency.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>4. Sharing Your Data</h2>
            <p>
              We never sell your personal information. We may share your information with trusted third parties such as visa authorities, educational institutions, or internship partners **only when necessary** to provide our consultancy services effectively.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies to improve your experience, track website analytics, and remember your preferences. You can manage cookies through your browser settings at any time.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. While we strive to ensure complete security, no online transmission or storage method can be guaranteed as 100% secure.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="privacy-right">
          <img src={privacyImg} alt="Privacy Illustration" />

          <div className="privacy-page-item">
            <h2>7. Your Rights</h2>
            <p>
              You have the right to request access, correction, or deletion of your personal information. You can also object to certain processing activities. Contact our support team anytime for assistance.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>8. Third-Party Links</h2>
            <p>
              Our website may include links to external sites like visa authorities, educational institutions, or internship providers. We are not responsible for the privacy practices of these external sites.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>9. Policy Updates</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our services or legal requirements. Any updates will be posted here with a revision date. Please check regularly.
            </p>
          </div>

          <div className="privacy-page-item">
            <h2>10. Contact Us</h2>
            <p>
              For any questions or concerns regarding your privacy or our services, please contact our support team. We are committed to guiding you safely and transparently through your visa, study abroad, and internship journey.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="privacy-footer">
        <p>
          By using our services or website, you acknowledge that you understand our role as a professional consultancy. We provide guidance, support, and facilitation, but the ultimate decision and processing of visas, study programs, or internships lie with the respective authorities. 
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
