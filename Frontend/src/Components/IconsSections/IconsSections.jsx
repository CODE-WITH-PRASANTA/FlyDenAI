import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPassport, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import "./IconsSections.css";

function IconsSections() {
  const items = [
    {
      title: "Visa Process",
      icon: <FontAwesomeIcon icon={faBook} />,
      description: "Sed perspiciatis unde omnis iste natus error sit voluptatem",
    },
    {
      title: "99% Visa Approvals",
      icon: <FontAwesomeIcon icon={faPassport} />,
      description: "Sed perspiciatis unde omnis iste natus error sit voluptatem",
    },
    {
      title: "Immigration",
      icon: <FontAwesomeIcon icon={faBalanceScale} />,
      description: "Sed perspiciatis unde omnis iste natus error sit voluptatem",
    },
  ];

  return (
    <section className="iconssections">
      {items.map((item, index) => (
        <div key={index} className="iconssections-item">
          <div className="iconssections-icon">{item.icon}</div>
          <h3 className="iconssections-title">{item.title}</h3>
          <p className="iconssections-description">{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default IconsSections;
