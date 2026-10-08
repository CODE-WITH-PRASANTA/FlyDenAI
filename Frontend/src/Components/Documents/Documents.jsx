import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Documents.css";
import BASE_URL from "../../Api";

const Documents = () => {
  const { id } = useParams();

  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  const [teamMembers, setTeamMembers] = useState([]);

  const [openSection, setOpenSection] = useState(true);

  const carouselRef = useRef(null);

  /* =====================================================
     FETCH VISA DETAILS
  ===================================================== */

  useEffect(() => {
    if (!id) return;

    const fetchVisa = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/visas/published/${id}`
        );

        if (data?.success) {
          setVisa(data.data);
        }
      } catch (err) {
        console.error(
          "Error fetching visa details:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVisa();
  }, [id]);

  /* =====================================================
     FETCH TEAM MEMBERS
  ===================================================== */

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/teammembers`
        );

        const base = BASE_URL.replace("/api", "");

        const members = Array.isArray(data?.data)
          ? data.data
          : [];

        const publishedMembers = members.filter(
          (member) => member.published
        );

        const updatedMembers =
          publishedMembers.map((member) => ({
            ...member,

            imageUrl: member.imageUrl?.startsWith(
              "http"
            )
              ? member.imageUrl
              : `${base}${member.imageUrl || ""}`,
          }));

        setTeamMembers(updatedMembers);
      } catch (err) {
        console.error(
          "Error fetching team members:",
          err
        );
      }
    };

    fetchTeam();
  }, []);

  /* =====================================================
     AUTO TEAM CAROUSEL
  ===================================================== */

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || teamMembers.length === 0) {
      return;
    }

    let requestId;

    const scrollStep = () => {
      if (
        carousel.scrollLeft >=
        carousel.scrollWidth -
          carousel.clientWidth -
          1
      ) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += 0.8;
      }

      requestId =
        requestAnimationFrame(scrollStep);
    };

    requestId =
      requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [teamMembers]);

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatUpdatedDate = (date) => {
    if (!date) {
      return "Not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flyixo-documents-state flyixo-documents-loading">
        <div className="flyixo-documents-spinner"></div>

        <span>
          Loading documents...
        </span>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (!visa) {
    return (
      <div className="flyixo-documents-state flyixo-documents-error">
        <div className="flyixo-documents-error-icon">
          !
        </div>

        <h3>
          No Visa Data Found
        </h3>

        <p>
          We couldn't find the requested visa
          information.
        </p>
      </div>
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <section
      id="documents"
      className="flyixo-documents-wrapper"
    >
      <div className="flyixo-documents-container">

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="flyixo-documents-left">

          {/* Section Heading */}
          <div className="flyixo-documents-heading">
            <span className="flyixo-documents-eyebrow">
              Flyixo Visa Assistance
            </span>

            <h2 className="flyixo-documents-title">
              Documents Required for{" "}
              {visa.country} Visa
            </h2>

            <p className="flyixo-documents-subtitle">
              Prepare the required documents carefully
              to ensure a smooth visa application
              process.
            </p>
          </div>

          {/* =================================================
              DOCUMENT ACCORDION
          ================================================= */}

          <div className="flyixo-document-section">

            <button
              type="button"
              className="flyixo-document-toggle-btn"
              onClick={() =>
                setOpenSection(
                  !openSection
                )
              }
              aria-expanded={openSection}
            >
              <span className="flyixo-document-toggle-content">
                <span className="flyixo-document-toggle-icon">
                  📄
                </span>

                <span>
                  Must Have Documents for{" "}
                  {visa.country} Visa
                </span>
              </span>

              <span
                className={`flyixo-document-arrow ${
                  openSection
                    ? "flyixo-document-arrow--open"
                    : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`flyixo-documents-list ${
                openSection
                  ? "flyixo-documents-list--open"
                  : ""
              }`}
            >
              <ul>
                {Array.isArray(
                  visa.documents
                ) &&
                visa.documents.length > 0 ? (
                  visa.documents.map(
                    (document, index) => (
                      <li
                        key={`${document}-${index}`}
                      >
                        <span className="flyixo-document-check">
                          ✓
                        </span>

                        <span>
                          {document}
                        </span>
                      </li>
                    )
                  )
                ) : (
                  <li className="flyixo-document-empty">
                    <span className="flyixo-document-check">
                      !
                    </span>

                    <span>
                      No documents listed for
                      this visa.
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* =================================================
              TEAM SECTION
          ================================================= */}

          <div className="flyixo-document-team-section">

            <div className="flyixo-team-heading">
              <span className="flyixo-team-eyebrow">
                Professional Support
              </span>

              <h3>
                Meet Our Team of Visa Experts
              </h3>

              <p>
                Get professional guidance from
                experienced visa specialists.
              </p>
            </div>

            {teamMembers.length > 0 ? (
              <div
                className="flyixo-team-carousel"
                ref={carouselRef}
              >
                {teamMembers.map(
                  (member, index) => (
                    <article
                      className="flyixo-document-team-card"
                      key={
                        member._id ||
                        member.id ||
                        index
                      }
                    >
                      <div className="flyixo-team-photo-wrapper">
                        <img
                          src={member.imageUrl}
                          alt={
                            member.name ||
                            "Visa Expert"
                          }
                          className="flyixo-team-photo"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />
                      </div>

                      <div className="flyixo-team-info">

                        <strong className="flyixo-team-name">
                          {member.name ||
                            "Visa Expert"}
                        </strong>

                        {member.designation && (
                          <div className="flyixo-team-designation">
                            {
                              member.designation
                            }
                          </div>
                        )}

                        {member.experience && (
                          <div className="flyixo-doc-team-exp">
                            <span>🧠</span>

                            <span>
                              {
                                member.experience
                              }{" "}
                              years experience
                            </span>
                          </div>
                        )}

                        {member.email && (
                          <div className="flyixo-team-email">
                            <span>📧</span>

                            <span>
                              {member.email}
                            </span>
                          </div>
                        )}

                      </div>
                    </article>
                  )
                )}
              </div>
            ) : (
              <div className="flyixo-team-empty">
                <span>👥</span>

                <p>
                  Our visa experts will be
                  available soon.
                </p>
              </div>
            )}
          </div>

          {/* =================================================
              VISA PROCESS BANNER
          ================================================= */}

          <div className="flyixo-visa-process-banner">

            <div className="flyixo-visa-process-content">
              <span className="flyixo-visa-process-icon">
                ✈
              </span>

              <div>
                <strong>
                  Need help with your visa
                  process?
                </strong>

                <p>
                  Our Flyixo experts can guide
                  you through every step.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flyixo-click-here-btn"
            >
              Get Assistance
              <span>→</span>
            </button>

          </div>

          {/* =================================================
              SAMPLE VISA CARD
          ================================================= */}

          <div className="flyixo-sample-visa-card">

            <div className="flyixo-sample-visa-left">

              <div className="flyixo-sample-visa-icon">
                📄
              </div>

              <div className="flyixo-sample-visa-text">
                <strong>
                  View Sample Visa Copy
                </strong>

                <span>
                  Check an example visa
                  document before applying.
                </span>
              </div>

            </div>

            <button
              type="button"
              className="flyixo-sample-visa-btn"
            >
              View Now
              <span>→</span>
            </button>

          </div>

          {/* =================================================
              LAST UPDATED
          ================================================= */}

          <div className="flyixo-documents-last-updated">

            <span className="flyixo-last-updated-icon">
              🕒
            </span>

            <span>
              Last Updated:
            </span>

            <strong>
              {formatUpdatedDate(
                visa.updatedAt
              )}
            </strong>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Documents;