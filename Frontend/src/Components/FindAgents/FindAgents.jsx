import React from "react";
import "./FindAgents.css";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";

export default function FindAgents() {
  const agents = [
    {
      icon: <FaUserTie size={28} />,
      title: "Find An Agent",
      text: "We have helped students, business persons, tourists, and clients with medical needs acquire U.S. visas.",
      gradient: "linear-gradient(135deg, #ff5f6d, #ffc371)",
    },
    {
      icon: <FaPhoneAlt size={28} />,
      title: "Call Us Anytime",
      text: "We also help with family immigration and provide expert counseling services for visa processes.",
      gradient: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    },
  ];

  return (
    <section className="find-agents-container">
      {agents.map((agent, index) => (
        <div
          className="find-agents-card"
          style={{ background: agent.gradient }}
          key={index}
        >
          <div className="icon-box">{agent.icon}</div>
          <div className="content-box">
            <h3>{agent.title}</h3>
            <p>{agent.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
