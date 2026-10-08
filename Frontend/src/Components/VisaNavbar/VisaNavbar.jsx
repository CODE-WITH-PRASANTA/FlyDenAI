import React from "react";
import "./VisaNavbar.css";

const VisaNavbar = ({ activeSection }) => {
  const handleSectionClick = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navItems = [
    {
      id: "types",
      label: "Types",
    },
    {
      id: "documents",
      label: "Documents",
    },
    {
      id: "process",
      label: "Process",
    },
    {
      id: "why-choose-us",
      label: "Why Choose Us",
    },
    {
      id: "faqs",
      label: "FAQs",
    },
    {
      id: "embassy",
      label: "Embassy",
    },
    {
      id: "visit-us",
      label: "Visit Us",
    },
  ];

  return (
    <nav className="flyixo-visa-navbar">
      <div className="flyixo-visa-navbar-container">
        <ul className="flyixo-visa-navbar-list">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`flyixo-visa-navbar-item ${
                activeSection === item.id
                  ? "flyixo-visa-navbar-item--active"
                  : ""
              }`}
              onClick={() => handleSectionClick(item.id)}
            >
              <span className="flyixo-visa-navbar-link">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default VisaNavbar;