import React from "react";
import "./Dummyticketbenefits.css";

const benefits = [
  {
    id: 1,
    title: "WE WORK 24/7",
    text: "Flyixo operates round the clock to ensure your flight and hotel reservations are processed anytime you need—day or night.",
    icon: "🕒",
  },
  {
    id: 2,
    title: "TIME SAVING",
    text: "Our streamlined reservation process helps you save valuable time, making visa documentation and travel planning faster and easier.",
    icon: "🌍",
  },
  {
    id: 3,
    title: "BEST VALUE GUARANTEED",
    text: "Flyixo offers competitive pricing and transparent charges—ensuring you get premium service at the most affordable rates.",
    icon: "💲",
  },
  {
    id: 4,
    title: "FAST SUPPORT RESPONSE",
    text: "Our dedicated support team responds quickly to all queries, giving you a smooth and stress-free experience.",
    icon: "💬",
  },
  {
    id: 5,
    title: "CONFIRMATION WITHIN 30 MINUTES",
    text: "Receive your dummy ticket or reservation confirmation typically within 10–30 minutes, perfect for urgent visa submissions.",
    icon: "📩",
  },
  {
    id: 6,
    title: "TRUSTED BY THOUSANDS",
    text: "Flyixo partners with reliable travel networks to deliver secure, accurate, and embassy-accepted travel reservations.",
    icon: "✔️",
  },
];

const BenefitsSection = () => {
  return (
    <section className="flyixo-benefits">

      {/* Background Decorations */}
      <div className="flyixo-benefits__orb flyixo-benefits__orb--one"></div>
      <div className="flyixo-benefits__orb flyixo-benefits__orb--two"></div>
      <div className="flyixo-benefits__grid-bg"></div>

      <div className="flyixo-benefits__container">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flyixo-benefits__header">

          <div className="flyixo-benefits__badge">
            <span className="flyixo-benefits__badge-dot"></span>
            WHY CHOOSE FLYIXO
          </div>

          <h2 className="flyixo-benefits__heading">
            Benefits: Why Choose{" "}
            <span>Flyixo?</span>
          </h2>

          <p className="flyixo-benefits__subtitle">
            Experience reliable travel documentation, quick support,
            transparent pricing, and a simple reservation process with
            Flyixo.
          </p>

          <div className="flyixo-benefits__heading-line">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

        {/* =====================================================
            BENEFITS GRID
        ====================================================== */}

        <div className="flyixo-benefits__grid">

          {benefits.map((item) => (
            <article
              className="flyixo-benefit-card"
              key={item.id}
            >

              {/* Number */}
              <span className="flyixo-benefit-card__number">
                {String(item.id).padStart(2, "0")}
              </span>

              {/* Top Accent */}
              <span className="flyixo-benefit-card__accent"></span>

              {/* Icon */}
              <div className="flyixo-benefit-card__icon-wrap">

                <div className="flyixo-benefit-card__icon-glow"></div>

                <span className="flyixo-benefit-card__icon">
                  {item.icon}
                </span>

              </div>

              {/* Content */}
              <div className="flyixo-benefit-card__content">

                <h3 className="flyixo-benefit-card__title">
                  {item.title}
                </h3>

                <p className="flyixo-benefit-card__text">
                  {item.text}
                </p>

              </div>

              {/* Footer */}
              <div className="flyixo-benefit-card__footer">

                <span className="flyixo-benefit-card__label">
                  FLYIXO ADVANTAGE
                </span>

                <span className="flyixo-benefit-card__arrow">
                  →
                </span>

              </div>

              {/* Decorative Corner */}
              <span className="flyixo-benefit-card__corner"></span>

            </article>
          ))}

        </div>

        {/* =====================================================
            BOTTOM TRUST
        ====================================================== */}

        <div className="flyixo-benefits__bottom">

          <span className="flyixo-benefits__bottom-line"></span>

          <div className="flyixo-benefits__bottom-content">

            <span className="flyixo-benefits__check">
              ✓
            </span>

            <p>
              Reliable Service
              <strong> • </strong>
              Fast Response
              <strong> • </strong>
              Transparent Pricing
              <strong> • </strong>
              <span>Flyixo</span>
            </p>

          </div>

          <span className="flyixo-benefits__bottom-line"></span>

        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;