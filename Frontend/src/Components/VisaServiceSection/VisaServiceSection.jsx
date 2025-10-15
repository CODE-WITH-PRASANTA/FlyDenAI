import React from 'react';
import './VisaServiceSection.css';
import studentVisa from "../../assets/explore1.webp";
import touristVisa from "../../assets/explore2.webp";
import workVisa from "../../assets/explore3.webp";

const visaOptions = [
  {
    id: 1,
    title: 'Student Visa',
    image: studentVisa,
    icon: '🎓',
    description:
      'We assist students in securing admissions and obtaining student visas with complete guidance on documentation, eligibility, and interview preparation.',
  },
  {
    id: 2,
    title: 'Tourist Visa',
    image: touristVisa,
    icon: '🧳',
    description:
      'Get expert help to apply for your travel or holiday visa. From filling applications to flight and hotel proof assistance — we make it effortless.',
  },
  {
    id: 3,
    title: 'Work Visa',
    image: workVisa,
    icon: '🧰',
    description:
      'We provide professional support for skilled worker and employment visa applications, ensuring all your documents meet embassy standards.',
  },
  {
    id: 4,
    title: 'Business Visa',
    image: touristVisa,
    icon: '💼',
    description:
      'Comprehensive assistance for entrepreneurs and professionals traveling for business — from invitation letters to financial documentation.',
  },
  {
    id: 5,
    title: 'Dependent Visa',
    image: studentVisa,
    icon: '👨‍👩‍👧',
    description:
      'We help families reunite abroad by assisting with dependent and spouse visa processes, ensuring quick and smooth approvals.',
  },
];

const VisaServiceSection = () => {
  return (
    <section className="visa-section">
      <p className="section-subtitle">Our Visa Services</p>
      <h2 className="VisaService-tittle">
        Simplify Your Visa Process with Expert Assistance
      </h2>

      <div className="visa-scroll-container">
        <div className="visa-card-grid">
          {visaOptions.map(({ id, title, image, icon, description }) => (
            <div key={id} className="visa-card">
              <div className="visa-image-wrapper">
                <img src={image} alt={title} className="visa-image" />
                <div className="visa-icon-bg">{icon}</div>
              </div>
              <div className="visa-content">
                <div className="visa-id">0{id}</div>
                <div className="visa-title">{title}</div>
                <p className="visa-description">{description}</p>
                <a href="#" className="visa-link">Learn More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaServiceSection;
