import React from 'react';
import './RentalTerms.css';
import serviceImage from "../../assets/nb2.webp";

const ServiceTerms = () => {
  return (
    <div className="terms-container">
      {/* Header */}
      <div className="terms-header">
        <div className="header-text">
          <h1>Terms and Conditions</h1>
          <p>
            Welcome to <strong>FlyDenAi</strong>, your trusted consultancy for Visa, Study Abroad, and Intern Abroad services. 
            These Terms and Conditions outline your rights, responsibilities, and the services we provide. 
            Please read them carefully before using our website or engaging with our consultancy services.
          </p>
        </div>
        <div className="header-image">
          <img src={serviceImage} alt="Services" />
        </div>
      </div>

      {/* Terms Grid */}
      <div className="terms-grid">
        <div className="terms-column">
          <div className="term-item">
            <h2>1. Consultancy Services</h2>
            <p>
              FlyDenAi acts solely as a professional consultancy and guidance provider. 
              We do not issue visas, enroll students, or provide internships directly. 
              Our services include providing accurate guidance, assisting with application forms, 
              document preparation, and process tracking to make your applications faster and more efficient.
            </p>
          </div>

          <div className="term-item">
            <h2>2. Visa, Study Abroad & Internship Applications</h2>
            <p>
              We guide you through the application process for visas, study abroad programs, and internships. 
              We ensure all documentation is complete and properly submitted, but the final approval or selection is entirely at the discretion of embassies, institutions, or internship providers.
            </p>
          </div>

          <div className="term-item">
            <h2>3. Payments & Fees</h2>
            <p>
              All payments made to FlyDenAi are for consultancy services only, including guidance, application assistance, and document verification. 
              Payment gateways are secure and handled by trusted third-party providers. 
              Any fees for visas, admissions, or internships themselves are separate and payable directly to the respective authorities. 
              Consultancy fees are <strong>non-refundable</strong> if delays, rejections, or errors occur due to client-provided information.
            </p>
          </div>

          <div className="term-item">
            <h2>4. Information Accuracy</h2>
            <p>
              Clients are responsible for providing accurate, complete, and valid information and documents. 
              FlyDenAi is not liable for any delays, errors, or rejections caused by incorrect or missing information.
            </p>
          </div>

          <div className="term-item">
            <h2>5. Eligibility & Supporting Documents</h2>
            <p>
              You must meet eligibility criteria for your chosen visa, study program, or internship. 
              We may request supporting documents to verify eligibility. Failure to provide these may result in delays or unsuccessful applications.
            </p>
          </div>
        </div>

        <div className="terms-column">
          <div className="term-item">
            <h2>6. Service Limitations</h2>
            <p>
              Our consultancy services include guidance, form filling assistance, and documentation support only. 
              FlyDenAi cannot influence, guarantee, or expedite the final decisions made by embassies, educational institutions, or internship providers.
            </p>
          </div>

          <div className="term-item">
            <h2>7. Cancellations & Modifications</h2>
            <p>
              Any request to modify or cancel consultancy services may incur additional charges depending on the work already completed. 
              Consultancy fees are non-refundable if cancellations are made after document submission or due to client errors.
            </p>
          </div>

          <div className="term-item">
            <h2>8. Refund Policy</h2>
            <p>
              FlyDenAi’s consultancy fees are non-refundable under the following circumstances:
              <ul>
                <li>Application rejections due to client-provided incorrect information.</li>
                <li>Delays caused by incomplete or late document submission.</li>
                <li>Voluntary withdrawal of applications by the client after submission.</li>
              </ul>
              Refunds may only be considered if the error was due to FlyDenAi’s gross negligence or omission.
            </p>
          </div>

          <div className="term-item">
            <h2>9. Liability</h2>
            <p>
              FlyDenAi is not responsible for visa denials, admission rejections, or internship refusals. 
              Clients use our consultancy services at their own discretion and acknowledge that the final decisions rest with the relevant authorities.
            </p>
          </div>

          <div className="term-item">
            <h2>10. Privacy & Data Use</h2>
            <p>
              By providing personal information, you consent to its use for application processing, payment facilitation, and communication regarding your services. 
              FlyDenAi follows strict data privacy and protection standards to ensure your information is safe.
            </p>
          </div>

          <div className="term-item">
            <h2>11. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. 
              Any disputes shall be resolved under the jurisdiction of courts in New Delhi. 
              Prior to legal action, clients are encouraged to contact our support team to resolve disputes amicably.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="terms-footer">
        <p>
          By using FlyDenAi’s services, you acknowledge that we are a consultancy guiding you through visa, study abroad, and internship processes. 
          We do not guarantee approvals, and final decisions rest with the respective authorities. 
          Consultancy fees are non-refundable for errors caused by client-provided information. 
          Please ensure you understand and agree to these Terms before engaging with our services.
        </p>
      </div>
    </div>
  );
};

export default ServiceTerms;
