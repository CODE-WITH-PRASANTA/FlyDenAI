import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowRight,
  FaGlobeAmericas,
  FaPassport,
  FaCheckCircle,
} from "react-icons/fa";
import "./VisaServiceSection.css";
import BASE_URL from "../../Api";

const VisaServiceSection = () => {
  const navigate = useNavigate();

  const [visaTypes, setVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH VISA TYPES
  // =====================================================

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visatypes`);

        if (res.data?.success) {
          setVisaTypes(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching visa types:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisas();
  }, []);

  // =====================================================
  // NAVIGATE TO VISA DETAILS
  // =====================================================

  const handleLearnMore = (id) => {
    navigate(`/visa-info/${id}`);
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "/default-visa.webp";
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    const base = BASE_URL.replace(/\/api\/?$/, "");

    const cleanImage = imageUrl
      .replace(/^\/+/, "")
      .replace(/^uploads\//, "");

    return `${base}/uploads/${cleanImage}`;
  };

  // =====================================================
  // DESCRIPTION
  // =====================================================

  const getDescription = (visa) => {
    const description =
      visa?.visaOverview ||
      visa?.visaDesc ||
      "Explore professional visa assistance and complete guidance for your international journey.";

    return description.length > 150
      ? `${description.slice(0, 150)}...`
      : description;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="visa-services-section">
        <div className="visa-services-loading">
          <div className="visa-services-loader">
            <FaPassport />
          </div>

          <h3>Loading Visa Services</h3>

          <p>
            Please wait while we load the latest visa categories.
          </p>
        </div>
      </section>
    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (
    <section className="visa-services-section">
      {/* Background Decorations */}
      <div className="visa-services-bg visa-services-bg-one"></div>
      <div className="visa-services-bg visa-services-bg-two"></div>
      <div className="visa-services-bg visa-services-bg-three"></div>
      <div className="visa-services-grid-pattern"></div>

      <div className="visa-services-container">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="visa-services-header">
          <div className="visa-services-eyebrow">
            <span className="visa-services-eyebrow-line"></span>

            <FaGlobeAmericas />

            <span>FLYIXO VISA SERVICES</span>

            <span className="visa-services-eyebrow-line"></span>
          </div>

          <p className="visa-services-subtitle">
            OUR VISA SERVICES
          </p>

          <h2 className="visa-services-title">
            Simplify Your Visa Process
            <span> With Expert Assistance</span>
          </h2>

          <p className="visa-services-description">
            Discover professional visa solutions with Flyixo. From
            documentation to application guidance, we help make your
            international journey simple, secure, and stress-free.
          </p>

          <div className="visa-services-title-line">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        {/* =================================================
            VISA CARDS
        ================================================= */}

        {visaTypes.length > 0 ? (
          <div className="visa-services-scroll-container">
            <div className="visa-services-card-grid">
              {visaTypes.map((visa, index) => {
                const imageSrc = getImageUrl(visa?.visaImageUrl);

                const cardNumber =
                  index + 1 < 10
                    ? `0${index + 1}`
                    : index + 1;

                return (
                  <article
                    key={visa._id}
                    className="visa-services-card"
                  >
                    {/* Card Number */}
                    <div className="visa-services-card-number">
                      {cardNumber}
                    </div>

                    {/* Image */}
                    <div className="visa-services-image-wrapper">
                      <img
                        src={imageSrc}
                        alt={`Flyixo ${visa?.visaName || "Visa Service"}`}
                        className="visa-services-image"
                        onError={(event) => {
                          event.currentTarget.src =
                            "/default-visa.webp";
                        }}
                      />

                      <div className="visa-services-image-overlay"></div>

                      <div className="visa-services-image-label">
                        <FaGlobeAmericas />
                        <span>Flyixo</span>
                      </div>

                      <div className="visa-services-icon">
                        <FaPassport />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="visa-services-content">
                      <span className="visa-services-card-label">
                        VISA CATEGORY
                      </span>

                      <h3 className="visa-services-card-title">
                        {visa?.visaName || "Visa Service"}
                      </h3>

                      <div className="visa-services-card-line"></div>

                      <p className="visa-services-card-description">
                        {getDescription(visa)}
                      </p>

                      <div className="visa-services-features">
                        <span>
                          <FaCheckCircle />
                          Expert Guidance
                        </span>

                        <span>
                          <FaCheckCircle />
                          Complete Support
                        </span>
                      </div>

                      <button
                        type="button"
                        className="visa-services-learn-more"
                        onClick={() =>
                          handleLearnMore(visa._id)
                        }
                      >
                        <span>Learn More</span>

                        <span className="visa-services-arrow">
                          <FaArrowRight />
                        </span>
                      </button>
                    </div>

                    {/* Bottom Accent */}
                    <div className="visa-services-card-bottom"></div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="visa-services-empty">
            <div className="visa-services-empty-icon">
              <FaPassport />
            </div>

            <h3>No Visa Categories Available</h3>

            <p>
              Visa categories will appear here once they are
              added to the system.
            </p>
          </div>
        )}

        {/* =================================================
            BOTTOM TRUST AREA
        ================================================= */}

        {visaTypes.length > 0 && (
          <div className="visa-services-bottom">
            <div className="visa-services-bottom-icon">
              <FaCheckCircle />
            </div>

            <div className="visa-services-bottom-content">
              <strong>
                Professional Visa Assistance By Flyixo
              </strong>

              <span>
                Simple process • Expert guidance • Global opportunities
              </span>
            </div>

            <div className="visa-services-bottom-badge">
              <FaGlobeAmericas />
              <span>GLOBAL SUPPORT</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VisaServiceSection;