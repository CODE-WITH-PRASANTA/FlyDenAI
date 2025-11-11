import React, { useEffect, useState } from "react";
import "./FindAgents.css";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";
import BASE_URL from "../../Api"; // Example: "http://localhost:5000/api"

export default function FindAgents() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Format phone number (e.g., 9876543210 → +91 98765 43210)
  const formatPhoneNumber = (number) => {
    if (!number) return "";
    const cleaned = number.replace(/\D/g, ""); // remove non-digits
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return `+91 ${cleaned}`; // fallback
  };

  // ✅ Fetch contact info from backend
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contacts`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          const publishedContact =
            data.data.find((item) => item.published === true) || data.data[0];
          setContact(publishedContact);
        }
      } catch (error) {
        console.error("❌ Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  const agents = [
    {
      icon: <FaUserTie size={28} />,
      title: "Find An Agent",
      text: "We have helped students, business persons, tourists, and clients with medical needs acquire visas. Our agents guide you professionally through the process.",
      gradient: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    },
    {
      icon: <FaPhoneAlt size={28} />,
      title: "Call Us Anytime",
      text: "For fast support, call us anytime for family immigration, visa advice, and expert counseling services.",
      gradient: "linear-gradient(135deg, #36d1dc, #5b86e5)",
      phone: contact?.phone,
    },
  ];

  if (loading) {
    return <div className="find-agents-container">Loading contact info...</div>;
  }

  return (
    <section className="find-agents-container">
      {agents.map((agent, index) => (
        <div
          className="find-agents-card"
          style={{ background: agent.gradient }}
          key={index}
        >
          <div className="icon-box">{agent.icon}</div>
          <div className="content-box">
            <h3>{agent.title}</h3>
            <p>{agent.text}</p>
            {agent.phone && (
              <a href={`tel:+91${agent.phone}`} className="call-button">
                📞 {formatPhoneNumber(agent.phone)}
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
