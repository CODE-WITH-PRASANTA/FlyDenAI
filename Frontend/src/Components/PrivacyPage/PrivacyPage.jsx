import React from "react";
import "./PrivacyPage.css";
import privacyImg from "../../assets/v6.webp";

const PrivacyPolicy = () => {
  return (
    <main className="privacy-page">
      {/* Background Decorations */}
      <div className="privacy-page-bg privacy-page-bg-one"></div>
      <div className="privacy-page-bg privacy-page-bg-two"></div>
      <div className="privacy-page-grid"></div>

      <div className="privacy-container">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="privacy-header">
          <div className="privacy-eyebrow">
            <span className="privacy-eyebrow-line"></span>
            <span>FLYIXO PRIVACY POLICY</span>
            <span className="privacy-eyebrow-line"></span>
          </div>

          <h1>
            Privacy <span>Policy</span>
          </h1>

          <p className="privacy-header-description">
            Your privacy and trust are important to Flyixo. Learn how we
            collect, use, protect, and manage your information while providing
            our consultancy services.
          </p>

          <div className="privacy-title-decoration">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="privacy-content">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="privacy-left">
            {/* Introduction */}
            <div className="privacy-introduction">
              <div className="privacy-introduction-badge">
                FLYIXO
              </div>

              <h2>
                Your Trust Is Our
                <span> Top Priority</span>
              </h2>

              <p>
                At Flyixo, your trust is our top priority. We act as a
                professional consultant to guide you in obtaining visas, study
                abroad opportunities, and internship placements. We do not
                provide visas or educational placements directly; instead, we
                help you navigate the process efficiently and securely. This
                Privacy Policy explains how we collect, use, and protect your
                information while using our services or visiting our website.
              </p>
            </div>

            {/* Section 1 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">01</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  INFORMATION
                </span>

                <h2>Information We Collect</h2>

                <p>
                  We collect personal information including your name, contact
                  details, passport information, academic records, internship
                  preferences, and payment details. This helps us provide
                  guidance, prepare your documents, and streamline the visa,
                  study abroad, or internship application process.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">02</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  DATA USAGE
                </span>

                <h2>How We Use Your Information</h2>

                <p>
                  Your information is used solely to provide consulting
                  services, guide you through visa and study abroad
                  applications, match you with suitable internships, assist
                  with document preparation, and ensure smooth communication.
                  We also use your data to enhance your experience and improve
                  our services.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">03</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  PAYMENTS
                </span>

                <h2>Payment Information</h2>

                <p>
                  Any payment you make for our consultancy services is
                  processed securely via trusted payment gateways. We do not
                  store your payment card information. Payment details are
                  handled directly by our gateway partners, ensuring safety and
                  transparency.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">04</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  DATA SHARING
                </span>

                <h2>Sharing Your Data</h2>

                <p>
                  We never sell your personal information. We may share your
                  information with trusted third parties such as visa
                  authorities, educational institutions, or internship partners
                  <strong> only when necessary</strong> to provide our
                  consultancy services effectively.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">05</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  WEBSITE
                </span>

                <h2>Cookies and Tracking</h2>

                <p>
                  We use cookies to improve your experience, track website
                  analytics, and remember your preferences. You can manage
                  cookies through your browser settings at any time.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">06</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  SECURITY
                </span>

                <h2>Data Security</h2>

                <p>
                  We implement industry-standard security measures to protect
                  your data. While we strive to ensure complete security, no
                  online transmission or storage method can be guaranteed as
                  100% secure.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="privacy-right">
            {/* Image */}
            <div className="privacy-image-wrapper">
              <img
                src={privacyImg}
                alt="Flyixo Privacy Policy"
                className="privacy-image"
              />

              <div className="privacy-image-overlay"></div>

              <div className="privacy-image-content">
                <span>FLYIXO</span>
                <strong>
                  Your Privacy.
                  <br />
                  Our Responsibility.
                </strong>
              </div>

              <div className="privacy-image-badge">
                <span className="privacy-badge-icon">✓</span>
                <div>
                  <strong>Secure & Trusted</strong>
                  <small>Flyixo Global Services</small>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">07</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  YOUR CONTROL
                </span>

                <h2>Your Rights</h2>

                <p>
                  You have the right to request access, correction, or deletion
                  of your personal information. You can also object to certain
                  processing activities. Contact our support team anytime for
                  assistance.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">08</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  EXTERNAL SERVICES
                </span>

                <h2>Third-Party Links</h2>

                <p>
                  Our website may include links to external sites like visa
                  authorities, educational institutions, or internship
                  providers. We are not responsible for the privacy practices
                  of these external sites.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="privacy-page-item">
              <div className="privacy-item-number">09</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  UPDATES
                </span>

                <h2>Policy Updates</h2>

                <p>
                  We may update this Privacy Policy periodically to reflect
                  changes in our services or legal requirements. Any updates
                  will be posted here with a revision date. Please check
                  regularly.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="privacy-page-item privacy-contact-card">
              <div className="privacy-item-number">10</div>

              <div className="privacy-item-content">
                <span className="privacy-item-label">
                  GET IN TOUCH
                </span>

                <h2>Contact Us</h2>

                <p>
                  For any questions or concerns regarding your privacy or our
                  services, please contact our support team. We are committed
                  to guiding you safely and transparently through your visa,
                  study abroad, and internship journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER NOTICE
        ===================================================== */}

        <div className="privacy-footer">
          <div className="privacy-footer-icon">✓</div>

          <div className="privacy-footer-content">
            <span>IMPORTANT NOTICE</span>

            <p>
              By using our services or website, you acknowledge that you
              understand our role as a professional consultancy. We provide
              guidance, support, and facilitation, but the ultimate decision
              and processing of visas, study programs, or internships lie with
              the respective authorities.
            </p>
          </div>
        </div>

        {/* Bottom Brand */}
        <div className="privacy-bottom-brand">
          <span></span>

          <p>
            Professional guidance. Global opportunities.{" "}
            <strong>Flyixo</strong>.
          </p>

          <span></span>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;