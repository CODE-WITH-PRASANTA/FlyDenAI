import React, { useEffect, useState } from "react";
import "./FindAgents.css";
import {
  FaUserTie,
  FaPhoneAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import BASE_URL from "../../Api";

const FindAgents = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FORMAT PHONE NUMBER
  // Example: 9876543210 → +91 98765 43210
  // =====================================================

  const formatPhoneNumber = (number) => {
    if (!number) return "";

    const cleaned = String(number).replace(/\D/g, "");

    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }

    if (cleaned.startsWith("91") && cleaned.length === 12) {
      const indianNumber = cleaned.slice(2);

      return `+91 ${indianNumber.slice(
        0,
        5
      )} ${indianNumber.slice(5)}`;
    }

    return `+91 ${cleaned}`;
  };

  // =====================================================
  // FETCH CONTACT INFORMATION
  // =====================================================

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contacts`);

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        if (
          data?.success &&
          Array.isArray(data?.data) &&
          data.data.length > 0
        ) {
          const publishedContact =
            data.data.find(
              (item) => item.published === true
            ) || data.data[0];

          setContact(publishedContact);
        }
      } catch (error) {
        console.error(
          "❌ Error fetching Flyixo contact data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  // =====================================================
  // AGENT DATA
  // =====================================================

  const agents = [
    {
      icon: <FaUserTie />,
      number: "01",
      label: "EXPERT SUPPORT",
      title: "Find An Agent",
      text:
        "We have helped students, business persons, tourists, and clients with medical needs acquire visas. Our Flyixo agents guide you professionally through every step of the process.",
      gradient:
        "linear-gradient(135deg, #e63975 0%, #ff758c 48%, #ff7eb3 100%)",
      iconClass: "agent-pink",
    },
    {
      icon: <FaPhoneAlt />,
      number: "02",
      label: "24/7 ASSISTANCE",
      title: "Call Us Anytime",
      text:
        "For fast support, call Flyixo anytime for family immigration, visa advice, international travel, and expert counseling services.",
      gradient:
        "linear-gradient(135deg, #246b9e 0%, #36d1dc 48%, #5b86e5 100%)",
      iconClass: "agent-blue",
      phone: contact?.phone,
    },
  ];

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <section className="find-agents-section">
        <div className="find-agents-background">
          <span className="find-agents-bg-circle find-agents-bg-circle-one"></span>
          <span className="find-agents-bg-circle find-agents-bg-circle-two"></span>
        </div>

        <div className="find-agents-loading">
          <div className="find-agents-loader"></div>

          <div className="find-agents-loading-content">
            <span>FLYIXO</span>
            <p>Loading contact information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="find-agents-section">
      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="find-agents-background">
        <span className="find-agents-bg-circle find-agents-bg-circle-one"></span>
        <span className="find-agents-bg-circle find-agents-bg-circle-two"></span>

        <span className="find-agents-bg-line find-agents-bg-line-one"></span>
        <span className="find-agents-bg-line find-agents-bg-line-two"></span>

        <div className="find-agents-grid"></div>
      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="find-agents-wrapper">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="find-agents-header">
          <div className="find-agents-badge">
            <span className="find-agents-badge-dot"></span>
            <span>FLYIXO SUPPORT</span>
          </div>

          <p className="find-agents-eyebrow">
            WE ARE HERE TO HELP
          </p>

          <h2 className="find-agents-title">
            Need Help With Your
            <span> Global Journey?</span>
          </h2>

          <p className="find-agents-description">
            Whether you need visa guidance, immigration support,
            or assistance with your international plans, the
            Flyixo team is ready to help.
          </p>
        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div className="find-agents-container">
          {agents.map((agent, index) => (
            <article
              className={`find-agents-card ${agent.iconClass}`}
              style={{
                "--agent-gradient": agent.gradient,
              }}
              key={agent.title}
            >
              {/* Decorative Elements */}
              <span className="find-agents-card-glow"></span>
              <span className="find-agents-card-circle"></span>
              <span className="find-agents-card-line"></span>

              {/* Number */}
              <div className="find-agents-number">
                {agent.number}
              </div>

              {/* Icon */}
              <div className="icon-box">
                <div className="icon-box-inner">
                  {agent.icon}
                </div>
              </div>

              {/* Content */}
              <div className="content-box">
                <span className="content-label">
                  {agent.label}
                </span>

                <h3>{agent.title}</h3>

                <p>{agent.text}</p>

                {agent.phone ? (
                  <a
                    href={`tel:+91${String(agent.phone).replace(
                      /\D/g,
                      ""
                    )}`}
                    className="call-button"
                  >
                    <span className="call-button-icon">
                      <FaPhoneAlt />
                    </span>

                    <span className="call-button-text">
                      {formatPhoneNumber(agent.phone)}
                    </span>

                    <span className="call-button-arrow">
                      <FaArrowRight />
                    </span>
                  </a>
                ) : (
                  <div className="agent-support">
                    <FaCheckCircle />
                    <span>Professional Visa Assistance</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* =================================================
            BOTTOM TRUST MESSAGE
        ================================================= */}

        <div className="find-agents-bottom">
          <div className="find-agents-bottom-line"></div>

          <div className="find-agents-bottom-content">
            <div className="find-agents-trust-item">
              <FaCheckCircle />
              <span>Expert Guidance</span>
            </div>

            <div className="find-agents-trust-item">
              <FaCheckCircle />
              <span>Personalized Support</span>
            </div>

            <div className="find-agents-trust-item">
              <FaCheckCircle />
              <span>Global Visa Assistance</span>
            </div>
          </div>

          <div className="find-agents-bottom-line"></div>
        </div>
      </div>
    </section>
  );
};

export default FindAgents;