import React from "react";
import "./Stats.css";
import { FaGlobe, FaUsers, FaPassport, FaSmileBeam } from "react-icons/fa";

const Stats = () => {
  const data = [
    {
      icon: <FaGlobe size={60} color="#fff" />,
      number: "25",
      title: "Office Worldwide",
      desc: "Established presence in multiple countries, serving clients globally.",
    },
    {
      icon: <FaUsers size={60} color="#fff" />,
      number: "789",
      title: "Team Members",
      desc: "Dedicated team of experts passionate about delivering exceptional results.",
    },
    {
      icon: <FaPassport size={60} color="#fff" />,
      number: "8K",
      title: "Visa Processed",
      desc: "Successfully processed thousands of visas, ensuring smooth travel experiences.",
    },
    {
      icon: <FaSmileBeam size={60} color="#fff" />,
      number: "99+",
      title: "Satisfied Clients",
      desc: "Overwhelmingly positive feedback from clients: a testament to our commitment to excellence.",
    },
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {data.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon-bg">
              <div className="stat-icon">{item.icon}</div>
            </div>
            <h2 className="stat-number">{item.number}</h2>
            <h4 className="stat-title">{item.title}</h4>
            <p className="stat-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;