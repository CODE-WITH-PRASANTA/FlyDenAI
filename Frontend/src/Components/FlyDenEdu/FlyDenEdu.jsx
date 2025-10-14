import React from 'react';
import {
  Buildings,
  Medal,
  Percent,
  GraduationCap
} from 'phosphor-react';
import './FlyDenEdu.css'; // Updated CSS file

const FlyDenEdu = () => {
  const features = [
    {
      icon: <Buildings size={48} weight="duotone" color="#1a73e8" />,
      title: '500+',
      description: 'Global University Partners',
    },
    {
      icon: <Medal size={48} weight="duotone" color="#ffa500" />,
      title: '10,000+',
      description: 'Students Guided Successfully',
    },
    {
      icon: <Percent size={48} weight="duotone" color="#28a745" />,
      title: 'Up to 100%',
      description: 'Scholarships & Financial Aid',
    },
    {
      icon: <GraduationCap size={48} weight="duotone" color="#6f42c1" />,
      title: 'Courses from ₹5 Lakhs*',
      description: 'Affordable Study Programs Abroad',
    },
  ];

  return (
    <section className="flyden-section">
      <h2 className="flyden-title">
        Why Choose <span>FlyDenAi?</span>
      </h2>

      <div className="flyden-grid">
        {features.map((feature, idx) => (
          <div className="flyden-card" key={idx}>
            <div className="flyden-icon">{feature.icon}</div>
            <h3 className="flyden-feature-title">{feature.title}</h3>
            <p className="flyden-feature-desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlyDenEdu;
