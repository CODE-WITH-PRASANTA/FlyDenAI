import React, { useEffect, useRef } from "react";
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

  const scrollRef = useRef(null);

  // ✅ Auto scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        scrollAmount += 1;
        // Reset scroll to start
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(autoScroll, 30); // speed control
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="visa-why-choose-us-wrapper">
      <h2 className="visa-why-choose-us-title">Why Choose Us?</h2>
      <div className="visa-why-choose-us-scroll" ref={scrollRef}>
        <div className="visa-why-choose-us-track">
          {services.map((service, index) => (
            <div key={index} className="visa-why-choose-us-card">
              <div className="visa-why-choose-us-icon">{service.icon}</div>
              <p className="visa-why-choose-us-text">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaWhyChooseUs;
