import React from "react";
import "./VisaWhyChooseUs.css";

const VisaWhyChooseUs = () => {
  const services = [
    { icon: "🛂", text: "Visa services for all countries" },
    { icon: "📋", text: "45+ years of experience in visa processing" },
    { icon: "🌐", text: "150+ branches worldwide" },
    { icon: "✅", text: "Visa success rate 99.8%" },
    { icon: "📍", text: "Start-to-end visa assistance" },
    { icon: "🚚", text: "Pick up & drop of documents" },
    { icon: "🔒", text: "Trusted for safety and confidentiality" },
  ];

  return (
    <section className="visa-why-choose-us-wrapper">
      <h2 className="visa-why-choose-us-title">Why Choose Us?</h2>
      <div className="visa-why-choose-us-grid">
        {services.map((service, index) => (
          <div key={index} className="visa-why-choose-us-card">
            <div className="visa-why-choose-us-icon">{service.icon}</div>
            <p className="visa-why-choose-us-text">{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaWhyChooseUs;
