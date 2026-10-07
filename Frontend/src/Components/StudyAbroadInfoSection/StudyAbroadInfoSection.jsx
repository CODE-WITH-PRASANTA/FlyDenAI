import React, { useState } from "react";
import "./StudyAbroadInfoSection.css";

function StudyAbroadInfoSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="study-info-section">
      {/* Background Decorations */}
      <div className="study-info-bg study-info-bg-one"></div>
      <div className="study-info-bg study-info-bg-two"></div>
      <div className="study-info-grid"></div>

      <div className="study-info-container">
        {/* Header */}
        <div className="study-info-header">
          <span className="study-info-eyebrow">
            FLYIXO STUDY ABROAD
          </span>

          <h2>
            Study Abroad with <span>Flyixo</span>
          </h2>

          <div className="study-info-title-line">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        {/* Introduction */}
        <div className="study-info-intro">
          <p>
            In recent years, the number of Indian students pursuing
            international education has grown rapidly. Over 1.3 million Indian
            students are expected to study abroad by 2025 — making India one of
            the largest global contributors to international education.
          </p>

          <p>
            As global opportunities expand, studying abroad is not just about
            getting a degree — it’s about transforming your future, gaining
            exposure, and building an international career that aligns with
            your dreams.
          </p>
        </div>

        {/* Read More */}
        {!expanded && (
          <div className="study-info-button-wrapper">
            <button
              type="button"
              className="read-more-btn"
              onClick={() => setExpanded(true)}
            >
              <span>Read More</span>
              <span className="read-more-arrow">→</span>
            </button>
          </div>
        )}

        {/* Expanded Content */}
        <div
          className={`readmore-content ${
            expanded ? "expanded" : "collapsed"
          }`}
        >
          {expanded && (
            <div className="study-expanded-inner">
              {/* Flyixo Introduction */}
              <div className="study-info-content-block">
                <p>
                  For many students investing lakhs in education overseas,
                  making the right choice is crucial. That’s where{" "}
                  <strong>Flyixo</strong> comes in — your smart, tech-powered
                  partner for a seamless study abroad journey.
                </p>

                <p>
                  With Flyixo, you get AI-driven university recommendations,
                  personalized counselling, and complete support — from
                  choosing your course to getting your visa approved.
                </p>
              </div>

              {/* Why Choose Flyixo */}
              <div className="study-info-section-block">
                <div className="study-info-heading-row">
                  <span className="study-info-heading-number">01</span>

                  <div>
                    <span className="study-info-heading-label">
                      FLYIXO ADVANTAGE
                    </span>
                    <h3>Why Choose Flyixo?</h3>
                  </div>
                </div>

                <p>
                  Flyixo combines expert human guidance with artificial
                  intelligence to ensure every student finds the best-fit
                  university and course for their career goals.
                </p>

                <ul className="study-info-list">
                  <li>
                    <span className="study-list-icon">✓</span>
                    <div>
                      <strong>AI Smart Match:</strong>
                      <span>
                        Our intelligent system analyzes your profile and
                        suggests universities where you have the highest
                        acceptance potential.
                      </span>
                    </div>
                  </li>

                  <li>
                    <span className="study-list-icon">✓</span>
                    <div>
                      <strong>Experienced Counsellors:</strong>
                      <span>
                        Our certified counsellors guide you through every step
                        — from applications to visa approvals.
                      </span>
                    </div>
                  </li>

                  <li>
                    <span className="study-list-icon">✓</span>
                    <div>
                      <strong>Global Network:</strong>
                      <span>
                        We partner with 800+ top-ranked universities across the
                        UK, USA, Canada, Australia, Germany, Ireland, and New
                        Zealand.
                      </span>
                    </div>
                  </li>

                  <li>
                    <span className="study-list-icon">✓</span>
                    <div>
                      <strong>End-to-End Services:</strong>
                      <span>
                        From SOP writing to flight booking, accommodation, and
                        post-arrival support — we handle everything.
                      </span>
                    </div>
                  </li>

                  <li>
                    <span className="study-list-icon">✓</span>
                    <div>
                      <strong>Student-First Approach:</strong>
                      <span>
                        Every plan is personalized, ensuring maximum
                        scholarship opportunities and success.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Top Destinations */}
              <div className="study-info-section-block">
                <div className="study-info-heading-row">
                  <span className="study-info-heading-number">02</span>

                  <div>
                    <span className="study-info-heading-label">
                      GLOBAL OPTIONS
                    </span>
                    <h3>Top Study Destinations with Flyixo</h3>
                  </div>
                </div>

                <ul className="study-info-destination-list">
                  <li>
                    <span className="destination-country">UK</span>
                    <span>
                      Renowned for globally recognized universities and
                      shorter degree durations.
                    </span>
                  </li>

                  <li>
                    <span className="destination-country">USA</span>
                    <span>
                      Home to the world’s best research institutions and
                      diverse learning environments.
                    </span>
                  </li>

                  <li>
                    <span className="destination-country">Canada</span>
                    <span>
                      Offers high-quality education and excellent post-study
                      work opportunities.
                    </span>
                  </li>

                  <li>
                    <span className="destination-country">Germany</span>
                    <span>
                      Study at top universities with low or no tuition fees
                      and world-class practical education.
                    </span>
                  </li>

                  <li>
                    <span className="destination-country">Australia</span>
                    <span>
                      Perfect blend of academic excellence and global
                      exposure.
                    </span>
                  </li>

                  <li>
                    <span className="destination-country">Ireland</span>
                    <span>
                      Growing as a global innovation hub with excellent
                      opportunities for tech and business students.
                    </span>
                  </li>
                </ul>
              </div>

              {/* How to Apply */}
              <div className="study-info-section-block">
                <div className="study-info-heading-row">
                  <span className="study-info-heading-number">03</span>

                  <div>
                    <span className="study-info-heading-label">
                      SIMPLE PROCESS
                    </span>
                    <h3>How to Apply with Flyixo</h3>
                  </div>
                </div>

                <ol className="study-info-steps">
                  <li>
                    <span>01</span>
                    <p>Visit www.flyixo.com</p>
                  </li>

                  <li>
                    <span>02</span>
                    <p>Click on “Start Your Journey”</p>
                  </li>

                  <li>
                    <span>03</span>
                    <p>Fill out your profile details</p>
                  </li>

                  <li>
                    <span>04</span>
                    <p>
                      Our expert team will contact you with your best
                      university options
                    </p>
                  </li>
                </ol>
              </div>

              {/* Scholarships */}
              <div className="study-info-section-block scholarship-block">
                <div className="study-info-heading-row">
                  <span className="study-info-heading-number">04</span>

                  <div>
                    <span className="study-info-heading-label">
                      FINANCIAL SUPPORT
                    </span>
                    <h3>Flyixo Global Scholarships</h3>
                  </div>
                </div>

                <p>
                  Flyixo believes in supporting talent globally. Eligible
                  students can receive scholarships up to{" "}
                  <strong>INR 15 lakhs</strong> from our partner universities
                  and education foundations.
                </p>

                <p>
                  Every applicant through Flyixo is automatically considered
                  for these scholarships — helping you save more and achieve
                  your dreams faster.
                </p>
              </div>

              {/* Read Less */}
              <div className="study-info-button-wrapper read-less-wrapper">
                <button
                  type="button"
                  className="read-more-btn read-less-btn"
                  onClick={() => setExpanded(false)}
                >
                  <span>Read Less</span>
                  <span className="read-more-arrow up-arrow">↑</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Brand */}
        <div className="study-info-bottom">
          <span></span>
          <p>
            Your global education journey starts with{" "}
            <strong>Flyixo</strong>.
          </p>
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default StudyAbroadInfoSection;