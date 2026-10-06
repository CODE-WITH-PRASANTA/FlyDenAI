import React from "react";
import "./Stats.css";

import {
  FaGlobe,
  FaUsers,
  FaPassport,
  FaSmileBeam,
} from "react-icons/fa";

const Stats = () => {
  const data = [
    {
      id: 1,
      icon: <FaGlobe />,
      number: "25",
      title: "Office Worldwide",
      desc: "Established presence in multiple countries, serving clients globally.",
    },
    {
      id: 2,
      icon: <FaUsers />,
      number: "789",
      title: "Team Members",
      desc: "Dedicated team of experts passionate about delivering exceptional results.",
    },
    {
      id: 3,
      icon: <FaPassport />,
      number: "8K",
      title: "Visa Processed",
      desc: "Successfully processed thousands of visas, ensuring smooth travel experiences.",
    },
    {
      id: 4,
      icon: <FaSmileBeam />,
      number: "99+",
      title: "Satisfied Clients",
      desc: "Overwhelmingly positive feedback from clients: a testament to our commitment to excellence.",
    },
  ];

  return (
    <section className="stats">
      <div className="stats-overlay"></div>

      <div className="stats-container">
        {data.map((item) => (
          <article className="stat-card" key={item.id}>
            <div className="stat-card-glow"></div>

            <div className="stat-icon-wrapper">
              <div className="stat-icon">
                {item.icon}
              </div>
            </div>

            <div className="stat-content">
              <h2 className="stat-number">
                {item.number}
              </h2>

              <h3 className="stat-title">
                {item.title}
              </h3>

              <div className="stat-divider"></div>

              <p className="stat-desc">
                {item.desc}
              </p>
            </div>

            <span className="stat-card-corner stat-card-corner-top"></span>
            <span className="stat-card-corner stat-card-corner-bottom"></span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Stats;