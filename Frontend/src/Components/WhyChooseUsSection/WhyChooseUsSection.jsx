// WhyChooseUsSection.js
import React from "react";
import "./WhyChooseUsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPassport,
  faCertificate,
  faGlobe,
  faHeadset,
  faBoxOpen,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function WhyChooseUsSection() {
  const services = [
    { icon: faPassport, text: "Visa Services for 180+ Countries" },
    { icon: faCertificate, text: "45+ years of expertise" },
    { icon: faGlobe, text: "150+ Branches Worldwide" },
    { icon: faHeadset, text: "Support from Start to Stamp" },
    { icon: faBoxOpen, text: "Doorstep Convenience" },
    { icon: faShieldAlt, text: "Safety & Confidentiality" },
  ];

  return (
    <div className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="why-choose-us-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="icon-container">
              <FontAwesomeIcon icon={service.icon} />
            </div>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
