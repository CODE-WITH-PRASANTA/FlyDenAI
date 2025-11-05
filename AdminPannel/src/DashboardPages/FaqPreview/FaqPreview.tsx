import React, { useState } from "react";
import "./FaqPreview.css";
import { FaTrashAlt } from "react-icons/fa";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const FaqPreview: React.FC = () => {
  const [faqData, setFaqData] = useState<Faq[]>([
    {
      id: 1,
      question: "What is your refund policy?",
      answer:
        "We offer a full refund if the request is made within 14 days of purchase. After that, refunds are provided only for valid disputes reviewed by our support team.",
    },
    {
      id: 2,
      question: "How long does it take to process a visa?",
      answer:
        "Processing times vary by country, but typically take between 5–7 business days. Expedited options are also available for urgent travel plans.",
    },
    {
      id: 3,
      question: "Can I edit my submitted FAQ later?",
      answer:
        "Yes, you can update your question and answer anytime before publishing. Once published, editing requires admin approval for transparency.",
    },
  ]);

  const handleDelete = (id: number) => {
    setFaqData((prev) => prev.filter((faq) => faq.id !== id));
  };

  return (
    <div className="faq-preview-container">
      {/* ===== HEADER SECTION ===== */}
      <header className="faq-preview-header">
        <div className="faq-preview-header-content">
          <h1 className="faq-preview-title">📋 FAQ Posting (Preview)</h1>
          <p className="faq-preview-subtitle">
            Review your FAQ list before publishing. You can view all questions and answers with an option to delete if needed.
          </p>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="faq-preview-main">
        {faqData.length > 0 ? (
          faqData.map((faq, index) => (
            <div className="faq-preview-card" key={faq.id}>
              <div className="faq-preview-left">
                <span className="faq-preview-number">{index + 1}</span>
              </div>

              <div className="faq-preview-content">
                <h3 className="faq-preview-question">{faq.question}</h3>
                <p className="faq-preview-answer">{faq.answer}</p>
              </div>

              <div className="faq-preview-actions">
                <button
                  className="faq-preview-delete-btn"
                  onClick={() => handleDelete(faq.id)}
                  title="Delete FAQ"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="faq-preview-empty">No FAQs available for preview.</p>
        )}
      </main>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="faq-preview-footer">
        <p>✅ Create a proper professional preview showing all FAQ details before publishing.</p>
      </footer>
    </div>
  );
};

export default FaqPreview;
