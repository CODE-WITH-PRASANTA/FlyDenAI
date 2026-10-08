import React, { useEffect, useRef } from "react";
import "./VisaWhyChooseUs.css";

const VisaWhyChooseUs = () => {
  const services = [
    {
      icon: "🛂",
      text: "Visa services for all countries",
    },
    {
      icon: "📋",
      text: "45+ years of experience in visa processing",
    },
    {
      icon: "🌐",
      text: "150+ branches worldwide",
    },
    {
      icon: "✅",
      text: "Visa success rate 99.8%",
    },
    {
      icon: "📍",
      text: "Start-to-end visa assistance",
    },
    {
      icon: "🚚",
      text: "Pick up & drop of documents",
    },
    {
      icon: "🔒",
      text: "Trusted for safety and confidentiality",
    },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    let animationFrame;
    let scrollPosition = 0;

    const autoScroll = () => {
      if (!scrollContainer) return;

      scrollPosition += 0.7;
      scrollContainer.scrollLeft = scrollPosition;

      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
        scrollContainer.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="flyixo-why-choose">
      <div className="flyixo-why-choose__container">

        {/* Header */}
        <div className="flyixo-why-choose__header">
          <span className="flyixo-why-choose__eyebrow">
            Why Flyixo?
          </span>

          <h2 className="flyixo-why-choose__title">
            Why Choose <span>Us?</span>
          </h2>

          <p className="flyixo-why-choose__subtitle">
            Experience reliable, professional, and hassle-free visa
            assistance designed to make your international journey easier.
          </p>
        </div>

        {/* Services Slider */}
        <div
          className="flyixo-why-choose__scroll"
          ref={scrollRef}
        >
          <div className="flyixo-why-choose__track">
            {services.map((service, index) => (
              <article
                key={index}
                className="flyixo-why-choose__card"
              >
                <div className="flyixo-why-choose__card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flyixo-why-choose__icon">
                  {service.icon}
                </div>

                <div className="flyixo-why-choose__content">
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Trust Message */}
        <div className="flyixo-why-choose__trust">
          <div className="flyixo-why-choose__trust-icon">
            ✓
          </div>

          <div className="flyixo-why-choose__trust-content">
            <strong>
              Your Journey, Our Responsibility
            </strong>

            <span>
              Professional visa assistance from application to approval.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisaWhyChooseUs;