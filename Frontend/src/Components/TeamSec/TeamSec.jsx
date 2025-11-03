import React, { useEffect, useState } from "react";
import { FaEnvelope, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./TeamSec.css";
import axios from "axios";
import BASE_URL from "../../Api";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 18, duration: 0.8 },
  },
  hover: {
    scale: 1.08,
    rotate: 1,
    transition: { type: "spring", stiffness: 250, damping: 20 },
  },
};

const iconVariants = {
  hover: {
    scale: [1, 1.4, 1],
    rotate: [0, 15, -10, 0],
    transition: { duration: 0.7, repeat: 1, ease: "easeInOut" },
  },
};

const TeamSec = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch team members from backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/teammembers`);
        if (res.data.success) {
          const publishedMembers = res.data.data.filter((m) => m.published === true);
          setTeamMembers(publishedMembers);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  // ✅ Share team member profile
  const handleShare = (member) => {
    const shareData = {
      title: `${member.name} - ${member.designation}`,
      text: `Meet ${member.name}, ${member.designation}${
        member.experience ? ` (${member.experience})` : ""
      } from our amazing team!`,
      url: window.location.href, // You can customize this to the actual team profile URL
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  if (loading) {
    return <p className="teamsec-loading">Loading team members...</p>;
  }

  if (teamMembers.length === 0) {
    return <p className="teamsec-nodata">No team members available</p>;
  }

  return (
    <section className="teamsec-section">
      <div className="teamsec-container">
        <motion.div
          className="teamsec-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              className="teamsec-card"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="teamsec-img"
                whileHover={{ rotate: 10, scale: 1.15 }}
                animate={{
                  y: [0, -6, 0],
                  transition: { duration: 5 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <img
                  src={
                    member.imageUrl
                      ? `${BASE_URL.replace("/api", "")}${member.imageUrl}`
                      : "https://via.placeholder.com/200"
                  }
                  alt={member.name}
                />
              </motion.div>

              <motion.h3
                className="teamsec-name"
                initial={{ y: 25, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.3 + index * 0.15, duration: 0.6, ease: "easeOut" },
                }}
              >
                {member.name}
              </motion.h3>

              <motion.p
                className="teamsec-designation"
                initial={{ y: 25, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.35 + index * 0.15, duration: 0.6, ease: "easeOut" },
                }}
              >
                {member.designation}
              </motion.p>

              {/* ✅ Experience Section */}
              {member.experience && (
                <motion.p
                  className="teamsec-experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5 + index * 0.15, duration: 0.6 },
                  }}
                >
                  Experience: {member.experience} Years
                </motion.p>
              )}

              <motion.div className="teamsec-icons" variants={iconVariants} whileHover="hover">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="teamsec-icon" title="Send Email">
                    <FaEnvelope />
                  </a>
                )}
                <span className="teamsec-divider"></span>
                <button
                  className="teamsec-icon share"
                  onClick={() => handleShare(member)}
                  title="Share Profile"
                >
                  <FaShareAlt />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSec;
