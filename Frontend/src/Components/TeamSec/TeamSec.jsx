import React, { useEffect, useState } from "react";
import { FaEnvelope, FaShareAlt, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import "./TeamSec.css";
import axios from "axios";
import BASE_URL from "../../Api";

// =====================================================
// ANIMATION VARIANTS
// =====================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      duration: 0.8,
    },
  },

  hover: {
    y: -10,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
    },
  },
};

const iconVariants = {
  hover: {
    scale: [1, 1.25, 1],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.7,
      repeat: 1,
      ease: "easeInOut",
    },
  },
};

// =====================================================
// COMPONENT
// =====================================================

const TeamSec = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===================================================
  // FETCH TEAM MEMBERS
  // ===================================================

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/teammembers`);

        if (res.data?.success) {
          const publishedMembers = (res.data.data || []).filter(
            (member) => member.published === true
          );

          setTeamMembers(publishedMembers);
        } else {
          setTeamMembers([]);
        }
      } catch (error) {
        console.error("Error fetching Flyixo team members:", error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // ===================================================
  // SHARE TEAM MEMBER
  // ===================================================

  const handleShare = async (member) => {
    const shareData = {
      title: `${member.name} - ${member.designation}`,
      text: `Meet ${member.name}, ${member.designation}${
        member.experience ? ` (${member.experience} Years Experience)` : ""
      } from the Flyixo team!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Profile link copied successfully!");
      } else {
        alert("Sharing is not supported on this device.");
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Error sharing team member:", error);
      }
    }
  };

  // ===================================================
  // IMAGE URL
  // ===================================================

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://via.placeholder.com/400x400?text=Flyixo";
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    return `${BASE_URL.replace("/api", "")}${imageUrl}`;
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <section className="teamsec-section">
        <div className="teamsec-container">
          <div className="teamsec-loading-wrapper">
            <div className="teamsec-loader"></div>

            <p className="teamsec-loading">
              Loading Flyixo team members...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================
  // EMPTY STATE
  // ===================================================

  if (teamMembers.length === 0) {
    return (
      <section className="teamsec-section">
        <div className="teamsec-container">
          <div className="teamsec-empty">
            <div className="teamsec-empty-icon">
              <FaUsers />
            </div>

            <h3>No Team Members Available</h3>

            <p>
              Our Flyixo team information will be available here soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <section className="teamsec-section">
      {/* Background Elements */}
      <div className="teamsec-bg teamsec-bg-one"></div>
      <div className="teamsec-bg teamsec-bg-two"></div>
      <div className="teamsec-grid-pattern"></div>

      <div className="teamsec-container">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <motion.div
          className="teamsec-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <span className="teamsec-eyebrow">
            <span className="teamsec-eyebrow-line"></span>
            FLYIXO TEAM
            <span className="teamsec-eyebrow-line"></span>
          </span>

          <h2 className="teamsec-title">
            Meet Our{" "}
            <span className="teamsec-title-highlight">
              Expert Team
            </span>
          </h2>

          <p className="teamsec-description">
            Meet the dedicated professionals behind Flyixo. Our experienced
            team is committed to helping students and professionals achieve
            their global visa, study abroad, and career goals.
          </p>

          <div className="teamsec-title-line">
            <span></span>
          </div>
        </motion.div>

        {/* =================================================
            TEAM GRID
        ================================================= */}

        <motion.div
          className="teamsec-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id || index}
              className="teamsec-card"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Card Glow */}
              <div className="teamsec-card-glow"></div>

              {/* Top Badge */}
              <div className="teamsec-member-badge">
                <span>FLYIXO</span>
              </div>

              {/* =================================================
                  IMAGE
              ================================================= */}

              <motion.div
                className="teamsec-image-wrapper"
                whileHover={{
                  rotate: 3,
                  scale: 1.05,
                }}
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 5 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="teamsec-image-ring">
                  <div className="teamsec-img">
                    <img
                      src={getImageUrl(member.imageUrl)}
                      alt={`${member.name || "Flyixo Team Member"} - Flyixo`}
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://via.placeholder.com/400x400?text=Flyixo";
                      }}
                    />
                  </div>
                </div>

                <span className="teamsec-image-dot"></span>
              </motion.div>

              {/* =================================================
                  MEMBER CONTENT
              ================================================= */}

              <motion.div
                className="teamsec-content"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.25 + index * 0.1,
                  duration: 0.6,
                }}
              >
                <h3 className="teamsec-name">
                  {member.name}
                </h3>

                <p className="teamsec-designation">
                  {member.designation}
                </p>

                {/* Experience */}
                {member.experience && (
                  <motion.div
                    className="teamsec-experience"
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      duration: 0.5,
                    }}
                  >
                    <span className="teamsec-experience-number">
                      {member.experience}
                    </span>

                    <span className="teamsec-experience-text">
                      Years Experience
                    </span>
                  </motion.div>
                )}
              </motion.div>

              {/* =================================================
                  SOCIAL / ACTION ICONS
              ================================================= */}

              <motion.div
                className="teamsec-icons"
                variants={iconVariants}
                whileHover="hover"
              >
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="teamsec-icon"
                    title="Send Email"
                    aria-label={`Email ${member.name}`}
                  >
                    <FaEnvelope />
                  </a>
                )}

                <span className="teamsec-divider"></span>

                <button
                  type="button"
                  className="teamsec-icon share"
                  onClick={() => handleShare(member)}
                  title="Share Profile"
                  aria-label={`Share ${member.name}'s profile`}
                >
                  <FaShareAlt />
                </button>
              </motion.div>

              {/* =================================================
                  BOTTOM LINE
              ================================================= */}

              <div className="teamsec-bottom">
                <span className="teamsec-bottom-line"></span>

                <span className="teamsec-bottom-text">
                  Flyixo Global Team
                </span>

                <span className="teamsec-bottom-line"></span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* =================================================
            BOTTOM TRUST AREA
        ================================================= */}

        <motion.div
          className="teamsec-trust"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="teamsec-trust-icon">
            <FaUsers />
          </div>

          <div className="teamsec-trust-content">
            <strong>Meet the Flyixo Experts</strong>

            <span>
              Professional guidance for your global journey
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSec;