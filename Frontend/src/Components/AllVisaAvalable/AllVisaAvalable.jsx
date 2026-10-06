import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllVisaAvalable.css";
import BASE_URL from "../../Api";

const AllVisaAvalable = () => {
  const navigate = useNavigate();

  const [visaTypes, setVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH VISA TYPES
  // =====================================================

  useEffect(() => {
    const fetchVisaTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/visatypes`);

        if (response.data?.success) {
          setVisaTypes(response.data.data || []);
        } else {
          console.warn("No visa types found in response.");
          setVisaTypes([]);
        }
      } catch (error) {
        console.error("Error fetching visa types:", error);
        setVisaTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVisaTypes();
  }, []);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (fileName) => {
    if (!fileName) return "";

    const cleanFileName = fileName
      .replace(/^\/?uploads\//, "")
      .replace(/^\/+/, "");

    return `${BASE_URL.replace("/api", "")}/uploads/${cleanFileName}`;
  };

  // =====================================================
  // ANIMATIONS
  // =====================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 70,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },

    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.12,
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    }),
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <motion.section
      className="allvisa-section"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
    >
      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="allvisa-bg allvisa-bg-one"></div>
      <div className="allvisa-bg allvisa-bg-two"></div>
      <div className="allvisa-bg allvisa-bg-three"></div>

      <div className="allvisa-grid-pattern"></div>

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="allvisa-wrapper">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="allvisa-header"
          variants={containerVariants}
        >
          <div className="allvisa-eyebrow">
            <span className="allvisa-eyebrow-line"></span>

            <span>FLYIXO VISA CATEGORIES</span>

            <span className="allvisa-eyebrow-line"></span>
          </div>

          <div className="allvisa-small-label">
            GLOBAL VISA SOLUTIONS
          </div>

          <h2 className="allvisa-title">
            Guiding Your{" "}
            <span>Visa Journey</span>{" "}
            With Expert Consultation
          </h2>

          <p className="allvisa-description">
            Explore our visa categories and discover professional guidance
            designed to make your international journey simpler, clearer,
            and more successful with Flyixo.
          </p>

          <div className="allvisa-title-decoration">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </motion.div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="allvisa-loading">
            <div className="allvisa-loader"></div>

            <p>
              Loading Flyixo visa categories...
            </p>
          </div>
        ) : visaTypes.length === 0 ? (

          /* =================================================
              EMPTY STATE
          ================================================= */

          <div className="allvisa-empty">
            <div className="allvisa-empty-icon">
              ✈
            </div>

            <h3>
              No Visa Types Available
            </h3>

            <p>
              Visa categories will appear here once they are added.
            </p>
          </div>

        ) : (

          /* =================================================
              VISA CARDS
          ================================================= */

          <motion.div
            className="allvisa-container"
            variants={containerVariants}
          >
            {visaTypes.map((visa, index) => (
              <motion.article
                className="allvisa-card"
                key={visa._id || index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
              >
                {/* Card Number */}
                <div className="allvisa-card-number">
                  {(index + 1)
                    .toString()
                    .padStart(2, "0")}
                </div>

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="allvisa-image">
                  {visa.visaImageUrl ? (
                    <img
                      src={getImageUrl(visa.visaImageUrl)}
                      alt={`${visa.visaName || "Visa"} - Flyixo`}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="allvisa-image-placeholder">
                      <span>FLYIXO</span>
                    </div>
                  )}

                  <div className="allvisa-image-overlay"></div>

                  <div className="allvisa-image-content">
                    <span>
                      FLYIXO VISA
                    </span>
                  </div>

                  <div className="allvisa-image-arrow">
                    →
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="allvisa-content">

                  <div className="allvisa-content-top">
                    <span className="allvisa-number-label">
                      VISA {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="allvisa-content-dot"></span>
                  </div>

                  <h3 className="allvisa-name">
                    {visa.visaName}
                  </h3>

                  {/* Description */}
                  <div
                    className="allvisa-description-text"
                    dangerouslySetInnerHTML={{
                      __html: visa.visaDesc
                        ? `${visa.visaDesc.substring(0, 250)}...`
                        : "Professional visa assistance from Flyixo.",
                    }}
                  />

                  {/* =================================================
                      SPECIAL FEATURES
                  ================================================= */}

                  {Array.isArray(visa.specialFeatures) &&
                    visa.specialFeatures.length > 0 && (
                      <motion.ul
                        className="allvisa-list"
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.3,
                          duration: 0.5,
                        }}
                      >
                        {visa.specialFeatures
                          .slice(0, 3)
                          .map((feature, featureIndex) => (
                            <li key={featureIndex}>
                              <span className="allvisa-check">
                                ✓
                              </span>

                              <span>
                                {feature}
                              </span>
                            </li>
                          ))}
                      </motion.ul>
                    )}

                  {/* =================================================
                      FOOTER
                  ================================================= */}

                  <div className="allvisa-footer">

                    <button
                      type="button"
                      className="allvisa-readmore"
                      onClick={() =>
                        navigate(
                          `/visa-info/${visa._id}`
                        )
                      }
                    >
                      <span>
                        EXPLORE VISA
                      </span>

                      <span className="allvisa-readmore-arrow">
                        →
                      </span>
                    </button>

                    <div className="allvisa-footer-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                  </div>
                </div>

                {/* Bottom accent */}
                <div className="allvisa-card-bottom-line"></div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default AllVisaAvalable;