import React, { useEffect, useRef, useState } from "react";
import "./Team.css";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // =====================================================
  // FETCH TEAM MEMBERS
  // =====================================================

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
        console.error("Error fetching team members:", error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // =====================================================
  // CAROUSEL SCROLL
  // =====================================================

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    const scrollAmount = 300;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "https://via.placeholder.com/300x300?text=Team+Member";
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    return `${BASE_URL.replace("/api", "")}${imageUrl}`;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="team-section">
      {/* Background Decorations */}
      <div className="team-bg team-bg-one"></div>
      <div className="team-bg team-bg-two"></div>
      <div className="team-grid-pattern"></div>

      <div className="team-container">
        {/* ================= HEADER ================= */}
        <motion.div
          className="team-header"
          initial={{
            opacity: 0,
            y: -30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="team-eyebrow">
            <span className="team-eyebrow-line"></span>

            <FaUsers />

            <span>FLYIXO TEAM</span>

            <span className="team-eyebrow-line"></span>
          </div>

          <h2 className="team-title">
            Meet Our <span>Amazing Team</span>
          </h2>

          <p className="team-description">
            Meet the professionals behind Flyixo who are dedicated to
            providing reliable visa, immigration, study abroad, and global
            opportunity guidance.
          </p>
        </motion.div>

        {/* ================= CONTENT ================= */}
        {loading ? (
          <div className="team-loading-wrapper">
            <div className="team-loader"></div>

            <p className="team-loading">
              Loading team members...
            </p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="team-no-data-wrapper">
            <div className="team-no-data-icon">
              <FaUsers />
            </div>

            <h3>No Team Members Available</h3>

            <p>
              Published team members will appear here.
            </p>
          </div>
        ) : (
          <div className="team-carousel-container">
            {/* LEFT BUTTON */}
            <button
              type="button"
              className="team-nav team-nav-left"
              onClick={() => scroll("left")}
              aria-label="Previous team members"
            >
              <FaArrowLeft />
            </button>

            {/* CAROUSEL */}
            <motion.div
              className="team-carousel"
              ref={carouselRef}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member._id || index}
                  className="team-member"
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    zIndex: 2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <div className="team-member-card">
                    {/* Card Header */}
                    <div className="team-card-header">
                      <div className="team-header-decoration"></div>

                      <div className="team-avatar-ring">
                        <img
                          src={getImageUrl(member.imageUrl)}
                          alt={member.name || "Team Member"}
                          className="team-member-img"
                          onError={(event) => {
                            event.currentTarget.src =
                              "https://via.placeholder.com/300x300?text=Team+Member";
                          }}
                        />
                      </div>

                      {/* Role */}
                      {member.designation && (
                        <div className="team-role-tag">
                          <FaBriefcase />
                          <span>{member.designation}</span>
                        </div>
                      )}

                      <div className="team-card-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Member Information */}
                    <div className="team-member-info">
                      <span className="team-member-label">
                        FLYIXO PROFESSIONAL
                      </span>

                      <h3 className="team-member-name">
                        {member.name}
                      </h3>

                      {member.designation && (
                        <p className="team-member-designation">
                          {member.designation}
                        </p>
                      )}

                      {member.experience && (
                        <div className="team-member-experience">
                          <span className="team-experience-dot"></span>

                          <span>
                            {member.experience} Experience
                          </span>
                        </div>
                      )}

                      <div className="team-info-line"></div>

                      <div className="team-card-footer">
                        <span>Flyixo Global Services</span>

                        <span className="team-footer-arrow">
                          <FaArrowRight />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* RIGHT BUTTON */}
            <button
              type="button"
              className="team-nav team-nav-right"
              onClick={() => scroll("right")}
              aria-label="Next team members"
            >
              <FaArrowRight />
            </button>
          </div>
        )}

        {/* Bottom Trust Area */}
        {!loading && teamMembers.length > 0 && (
          <motion.div
            className="team-bottom"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
          >
            <div className="team-bottom-item">
              <FaUsers />
              <span>Experienced Professionals</span>
            </div>

            <span className="team-bottom-divider"></span>

            <div className="team-bottom-item">
              <FaBriefcase />
              <span>Global Visa Expertise</span>
            </div>

            <span className="team-bottom-divider"></span>

            <div className="team-bottom-item">
              <FaUsers />
              <span>Client-Focused Support</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Team;