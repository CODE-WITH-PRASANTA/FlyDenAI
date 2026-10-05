import React from "react";
import "./CompanyReport.css";
import { motion } from "framer-motion";
import { FaFilePdf, FaChartLine, FaCheckCircle } from "react-icons/fa";

// Assets
import ReportImg from "../../assets/statistics-1.webp";

const CompanyReport = () => {
  const reportStats = [
    {
      label: "Student Visa",
      percent: 78,
    },
    {
      label: "Residence Visa",
      percent: 92,
    },
    {
      label: "Business Visa",
      percent: 65,
    },
    {
      label: "Tourist Visa",
      percent: 86,
    },
  ];

  return (
    <section className="companyreport-section">
      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div className="companyreport-bg companyreport-bg-one"></div>
      <div className="companyreport-bg companyreport-bg-two"></div>
      <div className="companyreport-bg companyreport-bg-three"></div>

      <div className="companyreport-grid-pattern"></div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="companyreport-container">
        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <motion.div
          className="companyreport-image-column"
          initial={{
            opacity: 0,
            x: -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <div className="companyreport-image-wrapper">
            {/* Decorative frame */}
            <div className="companyreport-image-frame"></div>

            {/* Image */}
            <div className="companyreport-image">
              <img
                src={ReportImg}
                alt="Flyixo Company Report and Statistics"
              />

              <div className="companyreport-image-overlay"></div>

              <div className="companyreport-image-shine"></div>
            </div>

            {/* Floating statistics badge */}
            <motion.div
              className="companyreport-floating-badge"
              animate={{
                y: [0, -9, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="companyreport-badge-icon">
                <FaChartLine />
              </div>

              <div className="companyreport-badge-content">
                <strong>Flyixo</strong>
                <span>Visa Statistics</span>
              </div>
            </motion.div>

            {/* Decorative dots */}
            <span className="companyreport-dot companyreport-dot-one"></span>
            <span className="companyreport-dot companyreport-dot-two"></span>
            <span className="companyreport-dot companyreport-dot-three"></span>
          </div>
        </motion.div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <motion.div
          className="companyreport-content"
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: 0.15,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            className="companyreport-eyebrow"
            initial={{
              opacity: 0,
              y: -20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
          >
            <span className="companyreport-eyebrow-line"></span>

            <span>COMPANY REPORTS & STATISTICS</span>

            <span className="companyreport-eyebrow-line"></span>
          </motion.div>

          {/* Flyixo label */}
          <div className="companyreport-brand">
            <span>FLYIXO</span>

            <i></i>

            <span>GLOBAL VISA PERFORMANCE</span>
          </div>

          {/* Title */}
          <motion.h2
            className="companyreport-title"
            initial={{
              opacity: 0,
              y: -20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            viewport={{
              once: true,
            }}
          >
            The Impact of Our{" "}
            <span>Competitive Efforts</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="companyreport-desc"
            initial={{
              opacity: 0,
              y: -20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            viewport={{
              once: true,
            }}
          >
            We strive for excellence and achieve remarkable results in visa
            processing, helping our clients realize their dreams efficiently.
            Our Flyixo team focuses on professional guidance and reliable
            support throughout the visa journey.
          </motion.p>

          {/* =================================================
              REPORT STATS
          ================================================= */}

          <div className="companyreport-stats">
            {reportStats.map((item, index) => (
              <motion.div
                className="companyreport-stat"
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
                viewport={{
                  once: true,
                }}
              >
                {/* Label */}
                <div className="companyreport-stat-header">
                  <div className="companyreport-stat-label">
                    <span className="companyreport-stat-icon">
                      <FaCheckCircle />
                    </span>

                    <span>{item.label}</span>
                  </div>

                  <span className="companyreport-stat-percent">
                    {item.percent}%
                  </span>
                </div>

                {/* Progress */}
                <div className="companyreport-progress">
                  <motion.div
                    className="companyreport-progress-fill"
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${item.percent}%`,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.15 + 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{
                      once: true,
                    }}
                  >
                    <span className="companyreport-progress-shine"></span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* =================================================
              REPORT SUMMARY
          ================================================= */}

          <div className="companyreport-summary">
            <div className="companyreport-summary-item">
              <strong>84%</strong>
              <span>Overall Visa Success</span>
            </div>

            <div className="companyreport-summary-divider"></div>

            <div className="companyreport-summary-item">
              <strong>2020</strong>
              <span>Report Year</span>
            </div>
          </div>

          {/* =================================================
              DOWNLOAD
          ================================================= */}

          <motion.div
            className="companyreport-download"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="companyreport-pdf-wrapper">
              <FaFilePdf className="companyreport-pdf-icon" />
            </div>

            <div className="companyreport-download-content">
              <span className="companyreport-download-label">
                DOWNLOAD
              </span>

              <strong className="companyreport-download-title">
                Report for the Year 2020
              </strong>
            </div>

            <span className="companyreport-download-arrow">
              →
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyReport;