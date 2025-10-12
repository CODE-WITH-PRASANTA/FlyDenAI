import React from 'react';
import './VisaServiceSection.css';
import explore1 from "../../assets/explore1.webp";
import explore2 from "../../assets/explore2.webp";
import explore3 from "../../assets/explore3.webp";

const visaOptions = [
  {
    id: 1,
    title: 'Student Visa',
    image: explore1,
    icon: '🎓',
    description: 'We denounce righteous indignation dislike beguiled demoralized charms.'
  },
  {
    id: 2,
    title: 'Tourist Visa',
    image: explore2,
    icon: '🧳',
    description: 'We denounce righteous indignation dislike beguiled demoralized charms.'
  },
  {
    id: 3,
    title: 'Worker Visa',
    image: explore3,
    icon: '🧰',
    description: 'We denounce righteous indignation dislike beguiled demoralized charms.'
  }
];

const VisaServiceSection = () => {
  return (
    <section className="visa-section">
      <p className="section-subtitle">Service We Provide</p>
      <h2 className="section-title">
        Explore Our Visa Citizenship & Immigration Services
      </h2>

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
              <a href="#" className="visa-link">Read More &gt;</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaServiceSection;
