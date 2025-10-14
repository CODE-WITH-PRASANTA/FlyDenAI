import React, { useState } from "react";
import "./StudyAbroadInfoSection.css";

function StudyAbroadInfoSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="study-info-section">
      <div className="study-info-container">
        <h2>
          Study Abroad with <span>FlyDenAi</span>
        </h2>

        <p>
          In recent years, the number of Indian students pursuing international
          education has grown rapidly. Over 1.3 million Indian students are
          expected to study abroad by 2025 — making India one of the largest
          global contributors to international education.
        </p>

        <p>
          As global opportunities expand, studying abroad is not just about
          getting a degree — it’s about transforming your future, gaining
          exposure, and building an international career that aligns with your
          dreams.
        </p>

        {!expanded && (
          <button className="read-more-btn" onClick={() => setExpanded(true)}>
            Read more ...
          </button>
        )}

        <div
          className={`readmore-content ${expanded ? "expanded" : "collapsed"}`}
        >
          {expanded && (
            <>
              <p>
                For many students investing lakhs in education overseas, making
                the right choice is crucial. That’s where <b>FlyDenAi</b> comes
                in — your smart, tech-powered partner for a seamless study
                abroad journey.
              </p>

              <p>
                With FlyDenAi, you get AI-driven university recommendations,
                personalized counselling, and complete support — from choosing
                your course to getting your visa approved.
              </p>

              <h3>Why Choose FlyDenAi?</h3>
              <p>
                FlyDenAi combines expert human guidance with artificial
                intelligence to ensure every student finds the best-fit
                university and course for their career goals.
              </p>

              <ul>
                <li>
                  <strong>AI Smart Match:</strong> Our intelligent system
                  analyzes your profile and suggests universities where you have
                  the highest acceptance potential.
                </li>
                <li>
                  <strong>Experienced Counsellors:</strong> Our certified
                  counsellors guide you through every step — from applications
                  to visa approvals.
                </li>
                <li>
                  <strong>Global Network:</strong> We partner with 800+
                  top-ranked universities across the UK, USA, Canada, Australia,
                  Germany, Ireland, and New Zealand.
                </li>
                <li>
                  <strong>End-to-End Services:</strong> From SOP writing to
                  flight booking, accommodation, and post-arrival support — we
                  handle everything.
                </li>
                <li>
                  <strong>Student-First Approach:</strong> Every plan is
                  personalized, ensuring maximum scholarship opportunities and
                  success.
                </li>
              </ul>

              <h3>Top Study Destinations with FlyDenAi</h3>
              <ul>
                <li>
                  <strong>UK:</strong> Renowned for globally recognized
                  universities and shorter degree durations.
                </li>
                <li>
                  <strong>USA:</strong> Home to the world’s best research
                  institutions and diverse learning environments.
                </li>
                <li>
                  <strong>Canada:</strong> Offers high-quality education and
                  excellent post-study work opportunities.
                </li>
                <li>
                  <strong>Germany:</strong> Study at top universities with low
                  or no tuition fees and world-class practical education.
                </li>
                <li>
                  <strong>Australia:</strong> Perfect blend of academic
                  excellence and global exposure.
                </li>
                <li>
                  <strong>Ireland:</strong> Growing as a global innovation hub
                  with excellent opportunities for tech and business students.
                </li>
              </ul>

              <h3>How to Apply with FlyDenAi</h3>
              <ol>
                <li>Visit www.flydenai.com</li>
                <li>Click on “Start Your Journey”</li>
                <li>Fill out your profile details</li>
                <li>Our expert team will contact you with your best university options</li>
              </ol>

              <h3>FlyDenAi Global Scholarships</h3>
              <p>
                FlyDenAi believes in supporting talent globally. Eligible
                students can receive scholarships up to <b>INR 15 lakhs</b> from
                our partner universities and education foundations.
              </p>

              <p>
                Every applicant through FlyDenAi is automatically considered for
                these scholarships — helping you save more and achieve your
                dreams faster.
              </p>

              <button
                className="read-more-btn"
                onClick={() => setExpanded(false)}
              >
                Read less ...
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default StudyAbroadInfoSection;
