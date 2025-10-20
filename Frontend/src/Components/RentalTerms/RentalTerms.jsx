import React from 'react';
import './RentalTerms.css';
import serviceImage from "../../assets/nb2.webp";

const ServiceTerms = () => {
  return (
    <div className="terms-container">
      <div className="terms-header">
        <div className="header-text">
          <h1>Terms And <br /> Conditions</h1>
          <p>
            Welcome to FlyDenAi, your trusted partner for Visa, Study Abroad, and Intern Abroad services.
            These terms and conditions govern your use of our website and services. By accessing our platform and 
            availing our services, you agree to comply with these terms. Please read carefully before proceeding.
          </p>
        </div>
        <div className="header-image">
          <img src={serviceImage} alt="Services" />
        </div>
      </div>

      <div className="terms-grid">
        <div className="terms-column">
          <div className="term-item">
            <h2>1. Service Agreement:</h2>
            <p>
              When you use our Visa, Study Abroad, or Intern Abroad services, you enter into a legally binding agreement 
              with us. This agreement outlines your responsibilities, service scope, and fees.
            </p>
          </div>

          <div className="term-item">
            <h2>2. Application Process:</h2>
            <p>
              All visa or admission applications are processed as per the requirements of the respective embassy or institution.
              FlyDenAi does not guarantee approval of any application, as the final decision rests with the relevant authority.
            </p>
          </div>

          <div className="term-item">
            <h2>3. Non-Refundable Payments:</h2>
            <p>
              All payments made for services, including visa processing, application fees, and consultation charges, are 
              non-refundable. If your visa or admission is rejected, you may avail another service, but previously paid 
              fees will not be refunded.
            </p>
          </div>

          <div className="term-item">
            <h2>4. Eligibility Criteria:</h2>
            <p>
              You must meet eligibility criteria for the respective visa, program, or internship. FlyDenAi may request 
              supporting documents to verify eligibility. Failure to provide valid documentation may result in service delays.
            </p>
          </div>

          <div className="term-item">
            <h2>5. Required Documents:</h2>
            <p>
              Clients are responsible for providing accurate and complete documents required for visa, admission, or 
              internship applications. FlyDenAi is not liable for delays or rejections caused by missing or incorrect documents.
            </p>
          </div>
        </div>

        <div className="terms-column">
          <div className="term-item">
            <h2>6. Payment Terms:</h2>
            <p>
              Payments must be made in full as specified in the invoice. We accept online transfers, card payments, and other 
              approved methods. Any additional fees charged by banks or institutions are the client’s responsibility.
            </p>
          </div>

          <div className="term-item">
            <h2>7. Service Limitations:</h2>
            <p>
              FlyDenAi facilitates documentation, application submissions, and guidance only. We do not guarantee visa approval, 
              admission, or internship selection.
            </p>
          </div>

          <div className="term-item">
            <h2>8. Changes & Cancellations:</h2>
            <p>
              You may request changes to your service, subject to approval. Cancellations or modifications may incur additional fees. 
              Non-refundable clauses still apply.
            </p>
          </div>

          <div className="term-item">
            <h2>9. Liability:</h2>
            <p>
              FlyDenAi is not responsible for any denial or rejection by embassies, educational institutions, or internship providers. 
              Clients agree to use our services at their own discretion.
            </p>
          </div>

          <div className="term-item">
            <h2>10. Governing Law:</h2>
            <p>
              These terms are governed by the laws of the applicable jurisdiction. Any disputes arising from these terms will be subject 
              to the exclusive jurisdiction of the courts within the relevant region.
            </p>
          </div>
        </div>
      </div>

      <div className="terms-footer">
        <p>
          By using our services, you acknowledge that you have read, understood, and agree to these terms and conditions. 
          If you do not agree, please refrain from availing our services.
        </p>
      </div>
    </div>
  );
};

export default ServiceTerms;
