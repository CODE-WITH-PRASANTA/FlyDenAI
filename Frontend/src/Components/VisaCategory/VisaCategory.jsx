import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "./VisaCategory.css";
import BASE_URL from "../../Api";

function VisaCategory() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [visaCategories, setVisaCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH VISA CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchVisaCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/visatypes`
        );

        if (response.data.success) {
          setVisaCategories(response.data.data || []);
        }
      } catch (error) {
        console.error(
          "Error fetching visa categories:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVisaCategories();
  }, []);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "";
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://") ||
      imageUrl.startsWith("blob:")
    ) {
      return imageUrl;
    }

    return `${BASE_URL.replace("/api", "")}${imageUrl}`;
  };

  // =====================================================
  // NAVIGATE TO VISA INFO
  // =====================================================

  const handleLearnMore = (id) => {
    navigate(`/visa-info/${id}`);
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <section className="visa-category-section">
        <div className="visa-loading">
          <div className="loading-spinner">
            <span></span>
          </div>

          <h2>
            Loading Visa Categories...
          </h2>

          <p>
            Please wait while we prepare the
            latest visa information.
          </p>
        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="visa-category-section">

      {/* =================================================
          BACKGROUND DECORATIONS
          ================================================= */}

      <div className="visa-bg-circle visa-bg-circle-one"></div>

      <div className="visa-bg-circle visa-bg-circle-two"></div>

      <div className="visa-bg-dot visa-bg-dot-one"></div>

      <div className="visa-bg-dot visa-bg-dot-two"></div>


      {/* =================================================
          HEADER
          ================================================= */}

      <div className="visa-category-header">

        <span className="visa-section-badge">
          <span className="visa-badge-icon">
            ✈
          </span>

          Visa Services
        </span>


        <h2>
          Discover Our{" "}
          <span className="highlight">
            Visa Consultation Categories
          </span>
        </h2>


        <div className="visa-heading-decoration">
          <span></span>
          <span></span>
          <span></span>
        </div>


        <p>
          We provide expert visa consultation for
          a wide range of purposes — including{" "}
          <strong>Tourist Visa</strong> for travel,
          <strong> Student Visa</strong> for higher
          education,
          <strong> Business Visa</strong> for corporate
          expansion,
          <strong> Job Visa</strong> for overseas
          employment, and
          <strong> Family Visa</strong> for reuniting
          with loved ones.
          <br />
          Get complete guidance from application to
          approval, tailored to your needs.
        </p>

      </div>


      {/* =================================================
          VISA CARDS
          ================================================= */}

      <div className="visa-category-scroll">

        {visaCategories.length > 0 ? (

          visaCategories.map((category) => (

            <article
              key={category._id}
              className="VisaCategory-card"
            >

              {/* =================================================
                  CARD TOP DECORATION
                  ================================================= */}

              <div className="visa-card-glow"></div>


              {/* =================================================
                  IMAGE
                  ================================================= */}

              <div className="visa-img-wrapper">

                {category.visaImageUrl ? (
                  <img
                    src={getImageUrl(
                      category.visaImageUrl
                    )}
                    alt={
                      category.visaName ||
                      "Visa Category"
                    }
                    className="VisaCategory-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="visa-image-placeholder">
                    <span>✈</span>
                  </div>
                )}

              </div>


              {/* =================================================
                  CARD CONTENT
                  ================================================= */}

              <div className="visa-card-content">

                {/* CATEGORY LABEL */}

                <div className="visa-card-label">
                  Visa Service
                </div>


                {/* TITLE */}

                <h3 className="visa-title">
                  {category.visaName}
                </h3>


                {/* TITLE LINE */}

                <div className="visa-title-line">
                  <span></span>
                </div>


                {/* DESCRIPTION */}

                <p
                  className="visacategory-description"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      category.visaOverview
                        ? category.visaOverview.slice(
                            0,
                            180
                          ) + "..."
                        : "Visa process information coming soon..."
                    ),
                  }}
                />


                {/* BUTTON */}

                <button
                  type="button"
                  className="visa-btn"
                  onClick={() =>
                    handleLearnMore(
                      category._id
                    )
                  }
                >
                  <span>
                    Learn More
                  </span>

                  <span className="visa-btn-arrow">
                    →
                  </span>
                </button>

              </div>

            </article>

          ))

        ) : (

          /* =================================================
             EMPTY STATE
             ================================================= */

          <div className="visa-empty-state">

            <div className="visa-empty-icon">
              ✈
            </div>

            <h3>
              No Visa Categories Found
            </h3>

            <p>
              Visa categories will appear here
              once they are available.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default VisaCategory;