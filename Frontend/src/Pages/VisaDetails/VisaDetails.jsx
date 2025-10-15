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
import Embassy from "../../Components/Embassy/Embassy";
import VisitUs from "../../Components/VisitUs/VisitUs";

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
              <TypesOfVisas />
            </div>
          </section>

          <section id="documents" className="section-wrapper">
            <div className="section-container">
              <Documents />
            </div>
          </section>

          <section id="process" className="section-wrapper">
            <div className="section-container">
              <Process />
            </div>
          </section>

          <section id="why-choose-us" className="section-wrapper">
            <div className="section-container">
              <VisaWhyChooseUs />
            </div>
          </section>

          <section id="faqs" className="section-wrapper">
            <div className="section-container">
              <Faqs />
            </div>
          </section>

          <section id="embassy" className="section-wrapper">
            <div className="section-container">
              <Embassy />
            </div>
          </section>

          <section id="visit-us" className="section-wrapper">
            <div className="section-container">
              <VisitUs />
            </div>
          </section>
        </div>

        {/* Right VisaForm */}
        <div className="visa-form-right">
          <VisaForm />
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;
