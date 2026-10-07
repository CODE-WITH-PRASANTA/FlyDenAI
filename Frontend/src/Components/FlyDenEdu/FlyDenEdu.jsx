import React from "react";
import {
  Buildings,
  Medal,
  Percent,
  GraduationCap,
} from "phosphor-react";
import "./FlyDenEdu.css";

const FlyixoEdu = () => {
  const features = [
    {
      icon: (
        <Buildings
          size={48}
          weight="duotone"
          color="#1a73e8"
        />
      ),
      title: "500+",
      description: "Global University Partners",
    },
    {
      icon: (
        <Medal
          size={48}
          weight="duotone"
          color="#ffa500"
        />
      ),
      title: "10,000+",
      description: "Students Guided Successfully",
    },
    {
      icon: (
        <Percent
          size={48}
          weight="duotone"
          color="#28a745"
        />
      ),
      title: "Up to 100%",
      description: "Scholarships & Financial Aid",
    },
    {
      icon: (
        <GraduationCap
          size={48}
          weight="duotone"
          color="#6f42c1"
        />
      ),
      title: "Courses from ₹5 Lakhs*",
      description: "Affordable Study Programs Abroad",
    },
  ];

  return (
    <section className="flyixo-edu-section">

      {/* Background Decorations */}
      <div className="flyixo-edu-bg flyixo-edu-bg-one"></div>
      <div className="flyixo-edu-bg flyixo-edu-bg-two"></div>
      <div className="flyixo-edu-grid-pattern"></div>

      <div className="flyixo-edu-container">

        {/* Header */}
        <div className="flyixo-edu-header">

          <div className="flyixo-edu-eyebrow">
            <span className="flyixo-edu-eyebrow-line"></span>

            <span>FLYIXO EDUCATION</span>

            <span className="flyixo-edu-eyebrow-line"></span>
          </div>

          <h2 className="flyixo-edu-title">
            Why Choose{" "}
            <span>Flyixo?</span>
          </h2>

          <p className="flyixo-edu-description">
            Discover the numbers that reflect our global education
            support and commitment to helping students achieve their
            study abroad goals.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="flyixo-edu-grid">

          {features.map((feature, idx) => (
            <article
              className="flyixo-edu-card"
              key={idx}
            >

              {/* Card Number */}
              <span className="flyixo-edu-card-number">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Top Accent */}
              <span className="flyixo-edu-card-accent"></span>

              {/* Icon */}
              <div className="flyixo-edu-icon-wrapper">

                <div className="flyixo-edu-icon-glow"></div>

                <div className="flyixo-edu-icon">
                  {feature.icon}
                </div>

              </div>

              {/* Content */}
              <div className="flyixo-edu-content">

                <h3 className="flyixo-edu-feature-title">
                  {feature.title}
                </h3>

                <p className="flyixo-edu-feature-desc">
                  {feature.description}
                </p>

              </div>

              {/* Bottom Label */}
              <div className="flyixo-edu-card-footer">

                <span>
                  Flyixo Advantage
                </span>

                <span className="flyixo-edu-arrow">
                  →
                </span>

              </div>

              {/* Decorative Corner */}
              <span className="flyixo-edu-card-corner"></span>

            </article>
          ))}

        </div>

        {/* Bottom Trust Line */}
        <div className="flyixo-edu-bottom">

          <span className="flyixo-edu-bottom-line"></span>

          <p>
            Global Education. Expert Guidance.{" "}
            <strong>Flyixo.</strong>
          </p>

          <span className="flyixo-edu-bottom-line"></span>

        </div>

      </div>
    </section>
  );
};

export default FlyixoEdu;