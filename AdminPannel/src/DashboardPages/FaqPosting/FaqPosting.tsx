import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./FaqPosting.css";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext"; 

interface Faq {
  id: number;
  question: string;
  answer: string;
  published: boolean;
}

const FaqPosting: React.FC = () => {
  const { theme } = useTheme(); // light | dark
  const [faqData, setFaqData] = useState<Faq[]>([]);
  const [newFaq, setNewFaq] = useState<Omit<Faq, "id" | "published">>({
    question: "",
    answer: "",
  });

  useEffect(() => {
    // Apply theme to root container dynamically
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFaq({ ...newFaq, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) {
      alert("Please fill both fields");
      return;
    }
    const newEntry: Faq = {
      ...newFaq,
      id: Date.now(),
      published: false,
    };
    setFaqData((prev) => [...prev, newEntry]);
    setNewFaq({ question: "", answer: "" });
  };

  const handleDelete = (id: number) => {
    setFaqData((prev) => prev.filter((faq) => faq.id !== id));
  };

  const handleEdit = (id: number) => {
    const selected = faqData.find((faq) => faq.id === id);
    if (selected) {
      setNewFaq({ question: selected.question, answer: selected.answer });
      setFaqData((prev) => prev.filter((faq) => faq.id !== id));
    }
  };

  const togglePublish = (id: number) => {
    setFaqData((prev) =>
      prev.map((faq) =>
        faq.id === id ? { ...faq, published: !faq.published } : faq
      )
    );
  };

  return (
    <div className={`faq-posting-container ${theme}`}>
      {/* Left Section */}
      <div className="faq-posting-form-section">
        <h2 className="faq-posting-title">➕ Add New FAQ</h2>
        <form onSubmit={handleSubmit} className="faq-posting-form">
          <label className="faq-posting-label">Question</label>
          <input
            type="text"
            name="question"
            value={newFaq.question}
            onChange={handleChange}
            placeholder="Enter your question"
            className="faq-posting-input"
          />

          <label className="faq-posting-label">Answer</label>
          <textarea
            name="answer"
            value={newFaq.answer}
            onChange={handleChange}
            placeholder="Enter the answer"
            className="faq-posting-textarea"
          />

          <button type="submit" className="faq-posting-btn">
            Post FAQ
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="faq-posting-list-section">
        <h2 className="faq-posting-title">📜 Manage FAQs</h2>
        <div className="faq-table-wrapper">
          <table className="faq-posting-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="faq-posting-no-data">
                    No FAQs added yet. Start by adding your first FAQ!
                  </td>
                </tr>
              ) : (
                faqData.map((faq, index) => (
                  <tr key={faq.id} className="faq-posting-row">
                    <td>{index + 1}</td>
                    <td>{faq.question}</td>
                    <td>{faq.answer}</td>
                    <td>
                      <span
                        className={`faq-posting-status ${
                          faq.published ? "published" : "unpublished"
                        }`}
                      >
                        {faq.published ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td className="faq-posting-actions">
                      <FaEdit
                        onClick={() => handleEdit(faq.id)}
                        className="faq-posting-icon edit"
                        title="Edit FAQ"
                      />
                      <FaTrash
                        onClick={() => handleDelete(faq.id)}
                        className="faq-posting-icon delete"
                        title="Delete FAQ"
                      />
                      {faq.published ? (
                        <FaEyeSlash
                          onClick={() => togglePublish(faq.id)}
                          className="faq-posting-icon unpublish"
                          title="Unpublish FAQ"
                        />
                      ) : (
                        <FaEye
                          onClick={() => togglePublish(faq.id)}
                          className="faq-posting-icon publish"
                          title="Publish FAQ"
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FaqPosting;
