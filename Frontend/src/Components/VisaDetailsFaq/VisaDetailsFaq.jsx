import React, { useState } from "react";
import "./VisaDetailsFaq.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqsData = [
  {
    question: "What is a Malaysia eVISA?",
    answer:
      "Malaysia eVISA is an official electronic visa that allows eligible foreign nationals to enter Malaysia for tourism, business, or social visits without visiting the Malaysian embassy.",
  },
  {
    question: "What is the validity of the Malaysia eVisa for Indians?",
    answer:
      "The Malaysia eVisa is usually valid for 3 months from the date of issuance, allowing a stay of up to 30 days per visit.",
  },
  {
    question: "How long does it take to process the Malaysia Visa for Indians?",
    answer:
      "Typically, it takes 2–5 working days to process the Malaysia eVisa, depending on your application completeness.",
  },
  {
    question: "Can my Malaysia Visa get rejected?",
    answer:
      "Yes, if the application is incomplete, contains errors, or does not meet entry requirements.",
  },
  {
    question: "Is it safe to submit my personal information online?",
    answer:
      "Yes, if you submit your data through the official Malaysia eVISA portal. Your information is encrypted and secure.",
  },
  {
    question: "Do kids and infants need a visa to enter Malaysia?",
    answer:
      "Yes, every traveler including children and infants must have a valid visa or eVISA.",
  },
  {
    question: "Can I get a refund if my Malaysia visa is not approved?",
    answer:
      "No, visa fees are generally non-refundable, even if the application is rejected.",
  },
];

const VisaDetailsFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="VisaDetails-Faq-wrapper">
      <h2 className="VisaDetails-Faq-title">Malaysia Visa FAQs</h2>
      <ul className="VisaDetails-Faq-list">
        {faqsData.map((faq, index) => (
          <li key={index} className="VisaDetails-Faq-item">
            <button
              className="VisaDetails-Faq-question"
              onClick={() => toggleFaq(index)}
            >
              <span className="VisaDetails-Faq-icon">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
              {faq.question}
            </button>
            <div
              className={`VisaDetails-Faq-answer ${
                openIndex === index ? "open" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VisaDetailsFaq;
