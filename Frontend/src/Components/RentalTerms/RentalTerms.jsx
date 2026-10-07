import React from "react";
import "./RentalTerms.css";
import serviceImage from "../../assets/nb2.webp";

const ServiceTerms = () => {
  return (
    <main className="flyixo-terms">
      {/* Background Decorations */}
      <div className="flyixo-terms-bg flyixo-terms-bg-one"></div>
      <div className="flyixo-terms-bg flyixo-terms-bg-two"></div>
      <div className="flyixo-terms-grid-pattern"></div>

      <div className="flyixo-terms-container">

        {/* ================= HEADER ================= */}
        <section className="flyixo-terms-header">
          <div className="flyixo-terms-header-content">
            <div className="flyixo-terms-eyebrow">
              <span className="flyixo-terms-eyebrow-line"></span>
              <span>FLYIXO LEGAL</span>
            </div>

            <h1 className="flyixo-terms-main-title">
              Terms & <span>Conditions</span>
            </h1>

            <p className="flyixo-terms-header-description">
              Welcome to <strong>Flyixo</strong>, your trusted consultancy for
              Visa, Study Abroad, and Intern Abroad services. These Terms and
              Conditions outline your rights, responsibilities, and the
              services we provide. Please read them carefully before using our
              website or engaging with our consultancy services.
            </p>

            <div className="flyixo-terms-header-info">
              <div className="flyixo-terms-info-item">
                <span className="flyixo-terms-info-icon">✓</span>
                <span>Professional Consultancy</span>
              </div>

              <div className="flyixo-terms-info-item">
                <span className="flyixo-terms-info-icon">✓</span>
                <span>Transparent Services</span>
              </div>

              <div className="flyixo-terms-info-item">
                <span className="flyixo-terms-info-icon">✓</span>
                <span>Client-Focused Support</span>
              </div>
            </div>
          </div>

          <div className="flyixo-terms-header-image-wrapper">
            <div className="flyixo-terms-image-frame">
              <img
                src={serviceImage}
                alt="Flyixo consultancy services"
                className="flyixo-terms-header-image"
              />

              <div className="flyixo-terms-image-overlay"></div>

              <div className="flyixo-terms-image-brand">
                <span className="flyixo-terms-brand-small">
                  PROFESSIONAL GUIDANCE
                </span>
                <strong>Flyixo</strong>
              </div>
            </div>

            <div className="flyixo-terms-image-decoration"></div>
          </div>
        </section>

        {/* ================= INTRO TITLE ================= */}
        <section className="flyixo-terms-section-heading">
          <span className="flyixo-terms-section-label">
            SERVICE AGREEMENT
          </span>

          <h2>
            Please Review Our
            <span> Service Terms</span>
          </h2>

          <p>
            These terms explain how Flyixo consultancy services work and the
            responsibilities of both Flyixo and our clients.
          </p>
        </section>

        {/* ================= TERMS GRID ================= */}
        <section className="flyixo-terms-content-grid">

          {/* LEFT COLUMN */}
          <div className="flyixo-terms-column">

            {/* 01 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">01</span>

              <div className="flyixo-term-card-content">
                <h3>Consultancy Services</h3>

                <p>
                  Flyixo acts solely as a professional consultancy and guidance
                  provider. We do not issue visas, enroll students, or provide
                  internships directly. Our services include providing accurate
                  guidance, assisting with application forms, document
                  preparation, and process tracking to make your applications
                  faster and more efficient.
                </p>
              </div>
            </article>

            {/* 02 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">02</span>

              <div className="flyixo-term-card-content">
                <h3>Visa, Study Abroad & Internship Applications</h3>

                <p>
                  We guide you through the application process for visas, study
                  abroad programs, and internships. We ensure all documentation
                  is complete and properly submitted, but the final approval or
                  selection is entirely at the discretion of embassies,
                  institutions, or internship providers.
                </p>
              </div>
            </article>

            {/* 03 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">03</span>

              <div className="flyixo-term-card-content">
                <h3>Payments & Fees</h3>

                <p>
                  All payments made to Flyixo are for consultancy services only,
                  including guidance, application assistance, and document
                  verification. Payment gateways are secure and handled by
                  trusted third-party providers.
                </p>

                <p>
                  Any fees for visas, admissions, or internships themselves are
                  separate and payable directly to the respective authorities.
                  Consultancy fees are <strong>non-refundable</strong> if
                  delays, rejections, or errors occur due to client-provided
                  information.
                </p>
              </div>
            </article>

            {/* 04 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">04</span>

              <div className="flyixo-term-card-content">
                <h3>Information Accuracy</h3>

                <p>
                  Clients are responsible for providing accurate, complete, and
                  valid information and documents. Flyixo is not liable for any
                  delays, errors, or rejections caused by incorrect or missing
                  information.
                </p>
              </div>
            </article>

            {/* 05 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">05</span>

              <div className="flyixo-term-card-content">
                <h3>Eligibility & Supporting Documents</h3>

                <p>
                  You must meet eligibility criteria for your chosen visa,
                  study program, or internship. We may request supporting
                  documents to verify eligibility. Failure to provide these may
                  result in delays or unsuccessful applications.
                </p>
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flyixo-terms-column">

            {/* 06 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">06</span>

              <div className="flyixo-term-card-content">
                <h3>Service Limitations</h3>

                <p>
                  Our consultancy services include guidance, form filling
                  assistance, and documentation support only. Flyixo cannot
                  influence, guarantee, or expedite the final decisions made by
                  embassies, educational institutions, or internship providers.
                </p>
              </div>
            </article>

            {/* 07 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">07</span>

              <div className="flyixo-term-card-content">
                <h3>Cancellations & Modifications</h3>

                <p>
                  Any request to modify or cancel consultancy services may incur
                  additional charges depending on the work already completed.
                  Consultancy fees are non-refundable if cancellations are made
                  after document submission or due to client errors.
                </p>
              </div>
            </article>

            {/* 08 */}
            <article className="flyixo-term-card flyixo-term-card-highlight">
              <span className="flyixo-term-number">08</span>

              <div className="flyixo-term-card-content">
                <h3>Refund Policy</h3>

                <p>
                  Flyixo's consultancy fees are non-refundable under the
                  following circumstances:
                </p>

                <ul className="flyixo-term-list">
                  <li>
                    Application rejections due to client-provided incorrect
                    information.
                  </li>

                  <li>
                    Delays caused by incomplete or late document submission.
                  </li>

                  <li>
                    Voluntary withdrawal of applications by the client after
                    submission.
                  </li>
                </ul>

                <p>
                  Refunds may only be considered if the error was due to
                  Flyixo's gross negligence or omission.
                </p>

                <p>
                  For payments made through online payment gateways, any
                  approved refund will be automatically credited to your
                  original method of payment within{" "}
                  <strong>10 business days</strong> from the date of approval.
                  Processing times may vary depending on your bank or payment
                  service provider.
                </p>
              </div>
            </article>

            {/* 09 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">09</span>

              <div className="flyixo-term-card-content">
                <h3>Liability</h3>

                <p>
                  Flyixo is not responsible for visa denials, admission
                  rejections, or internship refusals. Clients use our
                  consultancy services at their own discretion and acknowledge
                  that the final decisions rest with the relevant authorities.
                </p>
              </div>
            </article>

            {/* 10 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">10</span>

              <div className="flyixo-term-card-content">
                <h3>Privacy & Data Use</h3>

                <p>
                  By providing personal information, you consent to its use for
                  application processing, payment facilitation, and
                  communication regarding your services. Flyixo follows strict
                  data privacy and protection standards to ensure your
                  information is safe.
                </p>
              </div>
            </article>

            {/* 11 */}
            <article className="flyixo-term-card">
              <span className="flyixo-term-number">11</span>

              <div className="flyixo-term-card-content">
                <h3>Governing Law & Dispute Resolution</h3>

                <p>
                  These Terms are governed by the laws of India. Any disputes
                  shall be resolved under the jurisdiction of courts in New
                  Delhi. Prior to legal action, clients are encouraged to
                  contact our support team to resolve disputes amicably.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ================= OWNERSHIP ================= */}
        <section className="flyixo-ownership-section">
          <div className="flyixo-ownership-icon">
            <span>F</span>
          </div>

          <div className="flyixo-ownership-content">
            <span className="flyixo-ownership-label">
              WEBSITE INFORMATION
            </span>

            <h3>Website Ownership</h3>

            <p>
              This website is proudly owned and managed by{" "}
              <strong>Ravi Kumar</strong>. All content, design, and operations
              are maintained under his supervision to ensure a professional and
              reliable consultancy experience.
            </p>
          </div>
        </section>

        {/* ================= IMPORTANT NOTICE ================= */}
        <section className="flyixo-terms-footer">
          <div className="flyixo-terms-footer-icon">!</div>

          <div className="flyixo-terms-footer-content">
            <span>IMPORTANT NOTICE</span>

            <h3>Please Read Before Using Our Services</h3>

            <p>
              By using <strong>Flyixo</strong> services, you acknowledge that we
              are a consultancy guiding you through visa, study abroad, and
              internship processes. We do not guarantee approvals, and final
              decisions rest with the respective authorities. Consultancy fees
              are non-refundable for errors caused by client-provided
              information. Please ensure you understand and agree to these Terms
              before engaging with our services.
            </p>
          </div>
        </section>

        {/* ================= BOTTOM BRAND ================= */}
        <div className="flyixo-terms-bottom">
          <span></span>

          <p>
            Professional Guidance • Transparent Services •{" "}
            <strong>Flyixo</strong>
          </p>

          <span></span>
        </div>
      </div>
    </main>
  );
};

export default ServiceTerms;