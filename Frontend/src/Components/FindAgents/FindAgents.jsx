import React from "react";
import "./FindAgents.css";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";

export default function FindAgents() {
  const agents = [
    {
      icon: <FaUserTie size={28} />,
      title: "Find An Agent",
      text: "We have helped students, business persons, tourists, and clients with medical needs acquire U.S. visas. Our agents guide you professionally through the process.",
      gradient: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    },
    {
      icon: <FaPhoneAlt size={28} />,
      title: "Call Us Anytime",
      text: "For fast support, call us anytime for family immigration, visa advice, and expert counseling services.",
      gradient: "linear-gradient(135deg, #36d1dc, #5b86e5)",
      phone: "+1-234-567-890",
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
            {agent.phone && (
              <a href={`tel:${agent.phone}`} className="call-button">
                📞 {agent.phone}
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
