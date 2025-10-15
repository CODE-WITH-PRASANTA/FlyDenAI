import React, { useState, useEffect } from "react";
import "./VisaDetails.css";
import VisaDetailsBanner from "../../Components/VisaDetailsBanner/VisaDetailsBanner";
import VisaNavbar from "../../Components/VisaNavbar/VisaNavbar";
import VisaForm from "../../Components/VisaForm/VisaForm";

// Sections
import TypesOfVisas from "../../Components/TypesOfVisas/TypesOfVisas";
import Documents from "../../Components/Documents/Documents";
import Process from "../../Components/Process/Process";
import Faqs from "../../Components/Faqs/Faqs";
import VisaWhyChooseUs from "../../Components/VisaWhyChooseUs/VisaWhyChooseUs";

const VisaDetails = () => {
  const [activeSection, setActiveSection] = useState("types");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="visa-details-container">
      {/* Banner at the top */}
      <VisaDetailsBanner />

      {/* Sticky Navbar */}
      <VisaNavbar activeSection={activeSection} />

      {/* Main wrapper */}
      <div className="visa-content-wrapper">
        {/* Sections container */}
        <div className="visa-sections">
          <section id="types" className="section-wrapper">
            <div className="section-container">
              <div className="section-left">
                <TypesOfVisas />
              </div>
            </div>
          </section>

          <section id="documents" className="section-wrapper">
            <div className="section-container">
              <div className="section-left">
                <Documents />
              </div>
            </div>
          </section>

          <section id="process" className="section-wrapper">
            <div className="section-container">
              <div className="section-left">
                <Process />
              </div>
            </div>
          </section>

          <section id="why-choose-us" className="section-wrapper">
            <div className="section-container">
              <div className="section-left">
                <VisaWhyChooseUs />
              </div>
            </div>
          </section>

          <section id="faqs" className="section-wrapper">
            <div className="section-container">
              <div className="section-left">
                <Faqs />
              </div>
            </div>
          </section>

          {/* Add other sections below similarly */}
        </div>

        {/* Sticky right VisaForm */}
        <div className="visa-form-right">
          <VisaForm />
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;
