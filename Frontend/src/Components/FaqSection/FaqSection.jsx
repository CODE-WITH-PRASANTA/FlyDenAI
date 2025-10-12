import React, { useState } from "react";
import "./FaqSection.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// Import local images
import have1 from "../../assets/have.webp";
import have2 from "../../assets/have2.webp";
import have3 from "../../assets/have3.webp";

const faqs = [
  {
    id: 1,
    question: "What Is Visa Immigration Services?",
    answer:
      "Visa Immigration Services help individuals apply for, track, and receive their visas with professional guidance to ensure all documentation is correct and submitted on time.",
  },
  {
    id: 2,
    question: "Have Any Visa Consultant?",
    answer:
      "Yes, our experienced visa consultants guide you through each step — from selecting the right visa type to preparing the necessary documents.",
  },
  {
    id: 3,
    question: "How Much Does Visa Immigration Cost?",
    answer:
      "Visa processing costs vary by country and type. Our consultants provide transparent pricing with no hidden fees.",
  },
  {
    id: 4,
    question: "How Long Does Visa Processing Take?",
    answer:
      "Processing times depend on the country and visa type, but we aim to make the process as fast and smooth as possible.",
  },
];

const FaqSection = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-wrapper">
      {/* Left Image Grid */}
      <div className="faq-images">
        <div className="faq-image-grid">
          <img src={have1} alt="Main Consultant" className="faq-main-img" />
          <div className="faq-sub-images">
            <img src={have2} alt="Consultant 2" className="faq-sub-img" />
            <img src={have3} alt="Consultant 3" className="faq-sub-img" />
          </div>
        </div>
      </div>

      {/* Right FAQ Section */}
      <div className="faq-content">
        <p className="faq-subtitle">Have Any Questions?</p>
        <h2 className="faq-title">Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${activeId === faq.id ? "active" : ""}`}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="faq-question">
                <span className="faq-number">
                  {faq.id < 10 ? `0${faq.id}` : faq.id}.
                </span>
                <span className="faq-text">{faq.question}</span>
                <span className="faq-arrow">
                  {activeId === faq.id ? <FaChevronDown /> : <FaChevronRight />}
                </span>
              </div>
              {activeId === faq.id && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
