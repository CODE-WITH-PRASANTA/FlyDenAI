import React, { useEffect, useState } from "react";
import "./TeamSection.css";
import axios from "axios";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

import BASE_URL from "../../Api";
import i1 from "../../assets/col-bgimage-12.jpg";

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH TEAM MEMBERS
  ===================================================== */

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/teammembers`
        );

        setTeam(response.data?.data || []);
      } catch (err) {
        console.error(
          "Error fetching Flyixo team members:",
          err
        );

        setError(
          "Failed to load team members. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  /* =====================================================
     IMAGE URL HELPER
  ===================================================== */

  const getImagePath = (imageUrl) => {
    if (!imageUrl) {
      return i1;
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    return `${BASE_URL.replace("/api", "")}${imageUrl}`;
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section className="teamsec-section">
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="teamsec-background"
        aria-hidden="true"
      >
        <div className="teamsec-bg-circle teamsec-bg-circle-one"></div>

        <div className="teamsec-bg-circle teamsec-bg-circle-two"></div>

        <div className="teamsec-grid-pattern"></div>

        <div className="teamsec-bg-ring teamsec-bg-ring-one"></div>

        <div className="teamsec-bg-ring teamsec-bg-ring-two"></div>
      </div>

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="teamsec-container">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="teamsec-header">
          <div className="teamsec-badge">
            <span className="teamsec-badge-icon">
              <FaUsers />
            </span>

            <span>FLYIXO TEAM</span>
          </div>

          <p className="teamsec-eyebrow">
            MEET OUR EXPERTS
          </p>

          <h1 className="teamsec-heading">
            Your Trusted{" "}
            <span>
              Visa & Study Abroad Consultants
            </span>
          </h1>

          <p className="teamsec-description">
            Our dedicated and friendly experts specialize
            in visa assistance, study abroad guidance, and
            overseas internship placements. With years of
            experience and a client-first approach, we
            ensure every applicant receives the right
            advice, accurate documentation support, and
            end-to-end consultation for a smooth
            international journey.
          </p>

          <div className="teamsec-heading-divider">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        {loading ? (
          <div className="teamsec-status">
            <div className="teamsec-loader"></div>

            <div className="teamsec-status-content">
              <strong>FLYIXO</strong>
              <span>
                Loading our team members...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="teamsec-status teamsec-error">
            <div className="teamsec-error-icon">
              !
            </div>

            <div className="teamsec-status-content">
              <strong>Unable to Load Team</strong>
              <span>{error}</span>
            </div>
          </div>
        ) : team.length === 0 ? (
          <div className="teamsec-status">
            <div className="teamsec-empty-icon">
              <FaUsers />
            </div>

            <div className="teamsec-status-content">
              <strong>No Team Members Found</strong>
              <span>
                Team information will appear here once
                available.
              </span>
            </div>
          </div>
        ) : (
          <div className="teamsec-list">
            {team.map((member, index) => (
              <article
                className="teamsec-card"
                key={member._id || index}
                style={{
                  "--team-delay": `${index * 0.1}s`,
                }}
              >
                {/* Card Decorations */}
                <div className="teamsec-card-glow"></div>

                <div className="teamsec-card-ring"></div>

                <div className="teamsec-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="teamsec-image-wrapper">
                  <div className="teamsec-image-ring"></div>

                  <img
                    src={getImagePath(member.imageUrl)}
                    alt={
                      member.name
                        ? `Flyixo team member ${member.name}`
                        : "Flyixo team member"
                    }
                    className="teamsec-avatar"
                    onError={(event) => {
                      event.currentTarget.src = i1;
                    }}
                  />

                  <div className="teamsec-image-overlay"></div>

                  <div className="teamsec-member-status">
                    <span></span>
                    AVAILABLE
                  </div>
                </div>

                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div className="teamsec-info">
                  <h2 className="teamsec-name">
                    {member.name || "Flyixo Expert"}
                  </h2>

                  <p className="teamsec-role">
                    {member.designation ||
                      "Visa Consultant"}
                  </p>

                  {member.experience && (
                    <div className="teamsec-experience">
                      <span className="teamsec-experience-icon">
                        <FaCheckCircle />
                      </span>

                      <span>
                        {member.experience}
                      </span>

                      <small>Experience</small>
                    </div>
                  )}

                  <div className="teamsec-divider"></div>

                  {/* =================================================
                      SOCIAL LINKS
                  ================================================= */}

                  <div className="teamsec-icons">
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="teamsec-icon-box teamsec-facebook"
                        aria-label={`${member.name} Facebook`}
                      >
                        <FaFacebookF />
                      </a>
                    )}

                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="teamsec-icon-box teamsec-instagram"
                        aria-label={`${member.name} Instagram`}
                      >
                        <FaInstagram />
                      </a>
                    )}

                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="teamsec-icon-box teamsec-twitter"
                        aria-label={`${member.name} Twitter`}
                      >
                        <FaTwitter />
                      </a>
                    )}

                    {member.whatsapp && (
                      <a
                        href={`https://wa.me/${String(
                          member.whatsapp
                        ).replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="teamsec-icon-box teamsec-whatsapp"
                        aria-label={`${member.name} WhatsApp`}
                      >
                        <FaWhatsapp />
                      </a>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="teamsec-icon-box teamsec-email"
                        aria-label={`Email ${member.name}`}
                      >
                        <FaEnvelope />
                      </a>
                    )}
                  </div>
                </div>

                {/* =================================================
                    CARD FOOTER
                ================================================= */}

                <div className="teamsec-card-footer">
                  <span>
                    FLYIXO
                  </span>

                  <FaArrowRight />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* =================================================
            BOTTOM TRUST AREA
        ================================================= */}

        {!loading && !error && team.length > 0 && (
          <div className="teamsec-bottom">
            <div className="teamsec-bottom-line"></div>

            <div className="teamsec-bottom-content">
              <div className="teamsec-trust-item">
                <FaCheckCircle />
                <span>
                  Professional Guidance
                </span>
              </div>

              <div className="teamsec-trust-item">
                <FaCheckCircle />
                <span>
                  Personalized Consultation
                </span>
              </div>

              <div className="teamsec-trust-item">
                <FaCheckCircle />
                <span>
                  Global Opportunities
                </span>
              </div>
            </div>

            <div className="teamsec-bottom-line"></div>
          </div>
        )}
      </div>
    </section>
  );
}