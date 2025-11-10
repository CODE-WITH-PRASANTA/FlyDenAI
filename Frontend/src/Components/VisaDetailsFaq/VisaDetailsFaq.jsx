import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VisaDetailsFaq.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api";

const VisaDetailsFaq = () => {
  const { id } = useParams(); // ✅ Get visa ID from URL
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [country, setCountry] = useState("");

  // ✅ Fetch visa data (country + FAQs)
  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/visas/published/${id}`);
        if (data?.success && data?.data) {
          setFaqs(data.data.faqs || []);
          setCountry(data.data.country || "Visa");
        }
      } catch (err) {
        console.error("❌ Error fetching visa FAQs:", err);
      }
    };
    fetchVisaData();
  }, [id]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="VisaDetails-Faq-wrapper">
      <h2 className="VisaDetails-Faq-title">
        {country ? `${country} Visa FAQs` : "Visa FAQs"}
      </h2>

      {faqs.length > 0 ? (
        <ul className="VisaDetails-Faq-list">
          {faqs.map((faq, index) => (
            <li key={index} className="VisaDetails-Faq-item">
              <button
                className="VisaDetails-Faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span className="VisaDetails-Faq-icon">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
                {faq.q}
              </button>
              <div
                className={`VisaDetails-Faq-answer ${
                  openIndex === index ? "open" : ""
                }`}
              >
                <p>{faq.a}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-faqs-text">No FAQs available for this visa.</p>
      )}
    </section>
  );
};

export default VisaDetailsFaq;
