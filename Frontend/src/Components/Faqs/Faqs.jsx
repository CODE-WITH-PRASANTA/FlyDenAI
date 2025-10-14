import React, { useState } from "react";
import "./Faqs.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqsData = [
  {
    question: "What is a Malaysia eVISA?",
    answer: "Malaysia eVISA is an official electronic visa that allows eligible foreign nationals to enter Malaysia for tourism, business, or social visits without visiting the Malaysian embassy."
  },
  {
    question: "What is the validity of the Malaysia eVisa for Indians?",
    answer: "The Malaysia eVisa is usually valid for 3 months from the date of issuance, allowing a stay of up to 30 days per visit."
  },
  {
    question: "How long does it take to process the Malaysia Visa for Indians?",
    answer: "Typically, it takes 2-5 working days to process the Malaysia eVisa, depending on your application completeness."
  },
  {
    question: "What should I do after I receive my Malaysia eVISA?",
    answer: "After receiving your eVISA, print a copy to carry during travel. Ensure all details are correct, and keep it along with your passport when entering Malaysia."
  },
  {
    question: "Which are the designated ports of entry of arrival in Malaysia?",
    answer: "Designated ports include Kuala Lumpur International Airport (KLIA), Penang International Airport, Johor Bahru, and other approved entry points."
  },
  {
    question: "Is it possible to extend my eVISA for Malaysia?",
    answer: "No, the Malaysia eVISA cannot be extended. You must apply for a new visa if you plan to stay longer."
  },
  {
    question: "Is it safe to submit my personal information online for the Malaysia visa online process?",
    answer: "Yes, as long as you submit your information via the official Malaysia eVISA portal, your data is encrypted and secure."
  },
  {
    question: "What are the documents required upon arrival at the Malaysian entry checkpoints?",
    answer: "You need your passport, printed eVISA copy, and proof of accommodation and return flight tickets."
  },
  {
    question: "What is the procedure at the immigration counter when I enter Malaysia using Malaysia eVISA?",
    answer: "Present your passport and printed eVISA. The immigration officer may ask for additional documents or travel details."
  },
  {
    question: "Does my Malaysia Visa guarantee entry into Malaysia?",
    answer: "No, final entry is subject to approval by Malaysian immigration officials at the port of entry."
  },
  {
    question: "What is the easiest way to apply for a Malaysia Visa online?",
    answer: "The easiest way is to use the official Malaysian eVISA portal and follow the step-by-step application process."
  },
  {
    question: "Do I need to take a health/travel insurance?",
    answer: "It is highly recommended to have travel insurance for Malaysia covering medical emergencies and travel disruptions."
  },
  {
    question: "Are you still having doubts about the Malaysia Visa process?",
    answer: "You can always contact a licensed visa agent or refer to the official Malaysia immigration website for guidance."
  },
  {
    question: "Do I need to come in person to submit my Malaysia Visa application?",
    answer: "No, the Malaysia eVISA is entirely online. You do not need to visit the embassy."
  },
  {
    question: "Can I submit my Malaysia Visa application even though I do not have all the required documents?",
    answer: "It is not recommended. Incomplete applications may be rejected or delayed."
  },
  {
    question: "I plan to visit Malaysia next year, when should I apply for the Malaysia Visa online?",
    answer: "You should apply 1-2 months before your planned travel to allow enough time for processing."
  },
  {
    question: "If I cancel my Malaysia visa application, am I entitled for a refund?",
    answer: "No, visa fees are generally non-refundable once submitted."
  },
  {
    question: "How long does it take to get the Malaysia visa online?",
    answer: "Usually 2-5 working days."
  },
  {
    question: "What is a Multiple Entry Malaysia Visa for Indians?",
    answer: "A Multiple Entry Visa allows multiple entries to Malaysia within its validity period."
  },
  {
    question: "What are the entry requirements for all travellers to Malaysia?",
    answer: "A valid passport, visa or eVISA (if required), proof of funds, and return ticket are needed."
  },
  {
    question: "What is the difference between Single Entry and Multiple Entry Malaysia eVisa?",
    answer: "Single entry allows one entry during the visa validity, while multiple entry allows multiple entries."
  },
  {
    question: "Do kids and infants require to apply for Malaysia Visa to enter the country?",
    answer: "Yes, every traveler, including children and infants, must have a valid visa or eVISA."
  },
  {
    question: "Can my Malaysia Visa get rejected?",
    answer: "Yes, if the application is incomplete, contains errors, or does not meet entry requirements."
  },
  {
    question: "My Malaysia Visa was not approved, can I get refund?",
    answer: "Visa fees are typically non-refundable, even if your application is rejected."
  },
  {
    question: "Do I need to submit flight ticket and hotel reservation for my Malaysia Tourist Visa approval?",
    answer: "Yes, proof of travel and accommodation is required for approval."
  },
  {
    question: "Does the Malaysia Visit Visa guarantee entry into the country?",
    answer: "No, final entry is at the discretion of Malaysian immigration officers."
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faqs-wrapper">
      <h2 className="faqs-title">Malaysia Visa FAQs</h2>
      <ul className="faqs-list">
        {faqsData.map((faq, index) => (
          <li key={index} className="faqs-item">
            <button className="faqs-question" onClick={() => toggleFaq(index)}>
              <span className="faqs-icon">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
              {faq.question}
            </button>
            <div className={`faqs-answer ${openIndex === index ? "open" : ""}`}>
              {faq.answer}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Faqs;
