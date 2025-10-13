import React from 'react';
import {
  Buildings,
  Medal,
  Percent,
  GraduationCap
} from 'phosphor-react';
import './LeverageEdu.css';

const LeverageEdu = () => {
  const features = [
    {
      icon: <Buildings size={48} weight="duotone" color="#1a73e8" />,
      title: '850+',
      description: 'University Partners',
    },
    {
      icon: <Medal size={48} weight="duotone" color="#ffa500" />,
      title: '60,000+',
      description: 'Success Stories',
    },
    {
      icon: <Percent size={48} weight="duotone" color="#28a745" />,
      title: 'Up to 50%',
      description: 'Scholarships Available',
    },
    {
      icon: <GraduationCap size={48} weight="duotone" color="#6f42c1" />,
      title: '₹8 Lakhs*',
      description: 'Course Starting Price',
    },
  ];

  return (
    <section className="leverage-section">
      <h2 className="leverage-title">
        Why Choose <span>Leverage Edu?</span>
      </h2>

      <div className="leverage-grid">
        {features.map((f, idx) => (
          <div className="leverage-card" key={idx}>
            <div className="icon-wrapper">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeverageEdu;
