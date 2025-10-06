import React, { useState, useRef } from 'react';
import './FourIcons.css';
import { FaGlobeAmericas, FaPassport, FaMoneyBillWave, FaUserShield } from 'react-icons/fa';

const data = [
  {
    icon: <FaGlobeAmericas />,
    number: '35+',
    title: 'Countries',
    subtitle: 'Represented',
  },
  {
    icon: <FaPassport />,
    number: '853+',
    title: 'Completed',
    subtitle: 'Visa Passport',
  },
  {
    icon: <FaMoneyBillWave />,
    number: '55M+',
    title: 'Revenue',
    subtitle: 'In per year',
  },
  {
    icon: <FaUserShield />,
    number: '35+',
    title: 'Experience',
    subtitle: 'Immigration officer',
  },
];

const MAX_ROTATION = 15; // max degrees rotation

const FourIcons = () => {
  const [tiltStyles, setTiltStyles] = useState(
    Array(data.length).fill({ rotateX: 0, rotateY: 0 })
  );
  const cardRefs = useRef([]);

  const handleMouseMove = (index, e) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left; // mouse X in card
    const y = e.clientY - rect.top;  // mouse Y in card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation - inverse because rotating opposite direction of mouse movement
    const rotateX = ((y - centerY) / centerY) * MAX_ROTATION * -1;
    const rotateY = ((x - centerX) / centerX) * MAX_ROTATION;

    // Update state
    setTiltStyles((prev) => {
      const newStyles = [...prev];
      newStyles[index] = { rotateX, rotateY };
      return newStyles;
    });
  };

  const handleMouseLeave = (index) => {
    // Reset rotation when mouse leaves
    setTiltStyles((prev) => {
      const newStyles = [...prev];
      newStyles[index] = { rotateX: 0, rotateY: 0 };
      return newStyles;
    });
  };

  return (
    <section className="fouricons">
      {data.map((item, index) => {
        const { rotateX, rotateY } = tiltStyles[index];
        return (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="fouricons-card"
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
              transition: rotateX === 0 && rotateY === 0 ? 'transform 0.5s ease' : 'none',
              zIndex: rotateX !== 0 || rotateY !== 0 ? 10 : 0,
            }}
          >
            <div className="fouricons-icon-wrapper">
              <div className="fouricons-icon">{item.icon}</div>
            </div>
            <div className="fouricons-number">{item.number}</div>
            <div className="fouricons-title">{item.title}</div>
            <div className="fouricons-subtitle">{item.subtitle}</div>
          </div>
        );
      })}
    </section>
  );
};

export default FourIcons;
