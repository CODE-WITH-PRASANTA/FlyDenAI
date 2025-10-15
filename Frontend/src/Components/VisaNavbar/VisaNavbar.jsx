import React from "react";
import "./VisaNavbar.css";

const VisaNavbar = ({ activeSection }) => {
  const handleSectionClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "types", label: "Types" },
    { id: "documents", label: "Documents" },
    { id: "process", label: "Process" },
    { id: "why-choose-us", label: "Why Choose Us" },
    { id: "faqs", label: "FAQs" },
    { id: "embassy", label: "Embassy" },
    { id: "visit-us", label: "Visit Us" },
  ];

  return (
    <nav className="visa-navbar">
      <ul className="visa-navbar-list">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`visa-navbar-item ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => handleSectionClick(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VisaNavbar;
