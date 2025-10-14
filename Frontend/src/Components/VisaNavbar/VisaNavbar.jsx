import React from "react";
import "./VisaNavbar.css";

const VisaNavbar = ({ activeSection }) => {
  const links = [
    { href: "#types", label: "Types Of Visas" },
    { href: "#documents", label: "Documents" },
    { href: "#process", label: "Process" },
    { href: "#why-choose-us", label: "Why Choose Us" },
    { href: "#sample-visa", label: "Sample Visa" },
    { href: "#faqs", label: "FAQs" },
    { href: "#reviews", label: "Reviews" },
    { href: "#embassy", label: "Embassy" },
    { href: "#visit-us", label: "Visit Us" },
  ];

  return (
    <nav className="visanavbar">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={activeSection === link.href.substring(1) ? "visanavbar-active" : ""}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default VisaNavbar;
