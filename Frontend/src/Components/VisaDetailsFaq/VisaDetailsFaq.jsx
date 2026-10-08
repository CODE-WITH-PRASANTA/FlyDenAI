import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VisaDetailsFaq.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api";

const VisaDetailsFaq = () => {
  const { id } = useParams();

  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        if (!id) return;

        const { data } = await axios.get(
          `${BASE_URL}/visas/published/${id}`
        );

        if (data?.success && data?.data) {
          setFaqs(data.data.faqs || []);
          setCountry(data.data.country || "Visa");
        }
      } catch (err) {
        console.error("Error fetching visa FAQs:", err);
      }
    };

    fetchVisaData();
  }, [id]);

  const toggleFaq = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section className="flyixo-faq">
      <div className="flyixo-faq__container">

        {/* Header */}
        <div className="flyixo-faq__header">
          <span className="flyixo-faq__eyebrow">
            Frequently Asked Questions
          </span>

          <h2 className="flyixo-faq__title">
            {country
              ? `${country} Visa FAQs`
              : "Visa FAQs"}
          </h2>

          <p className="flyixo-faq__subtitle">
            Find answers to the most common questions about your
            visa application and travel process.
          </p>
        </div>

        {/* FAQ List */}
        {faqs.length > 0 ? (
          <div className="flyixo-faq__list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={index}
                  className={`flyixo-faq__item ${
                    isOpen ? "flyixo-faq__item--open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="flyixo-faq__question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`flyixo-faq-answer-${index}`}
                  >
                    <span className="flyixo-faq__question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flyixo-faq__question-text">
                      {faq.q}
                    </span>

                    <span className="flyixo-faq__icon">
                      {isOpen ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>

                  <div
                    id={`flyixo-faq-answer-${index}`}
                    className={`flyixo-faq__answer ${
                      isOpen ? "flyixo-faq__answer--open" : ""
                    }`}
                  >
                    <div className="flyixo-faq__answer-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flyixo-faq__empty">
            <div className="flyixo-faq__empty-icon">
              ?
            </div>

            <h3>No FAQs Available</h3>

            <p>
              There are currently no frequently asked questions
              available for this visa.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default VisaDetailsFaq;