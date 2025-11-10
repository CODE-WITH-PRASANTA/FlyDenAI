import React, { useState, useEffect } from 'react';
import "./VisaDetails.css";
import VisaDetailsBanner from "../../Components/VisaDetailsBanner/VisaDetailsBanner";
import VisaNavbar from "../../Components/VisaNavbar/VisaNavbar";
import VisaForm from "../../Components/VisaForm/VisaForm";

// Sections
import TypesOfVisas from "../../Components/TypesOfVisas/TypesOfVisas";
import Documents from "../../Components/Documents/Documents";
import Process from "../../Components/Process/Process";
import VisaWhyChooseUs from "../../Components/VisaWhyChooseUs/VisaWhyChooseUs";
import Embassy from "../../Components/Embassy/Embassy";
import VisitUs from "../../Components/VisitUs/VisitUs";
import VisaDetailsFaq from '../../Components/VisaDetailsFaq/VisaDetailsFaq';

const VisaDetails = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(prev => !prev);
  };

  // ✅ Show "Back to Top" button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="visa-details-container">
      {/* Banner */}
      <VisaDetailsBanner />

      {/* Sticky Navbar */}
      <VisaNavbar />

      {/* Main content */}
      <div className="visa-content-wrapper">
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

          <section id="faqs" className="section-wrapper">
            <div className="section-container">
              <VisaDetailsFaq />
            </div>
          </section>

          <section id="why-choose-us" className="section-wrapper">
            <div className="section-container">
              <VisaWhyChooseUs />
            </div>
          </section>

          <section id="embassy" className="section-wrapper">
            <div className="section-container">
              <Embassy />
            </div>
          </section>

          {/* <section id="visit-us" className="section-wrapper">
            <div className="section-container">
              <VisitUs />
            </div>
          </section> */}
        </div>

        {/* Floating VisaForm */}
        <div className={`floating-form-wrapper ${isFormOpen ? 'open' : ''}`}>
          <button className="floating-form-toggle" onClick={toggleForm}>
            {isFormOpen ? '×' : '^'}
          </button>
          {isFormOpen && (
            <div className="floating-form-content">
              <VisaForm />
            </div>
          )}
        </div>

        {/* 🔝 Back to Top Button */}
        {showScrollTop && (
          <button className="VisaDetails-Scroll-Top" onClick={scrollToTop}>
            🔝
          </button>
        )}
      </div>
    </div>
  );
};

export default VisaDetails;
