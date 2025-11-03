import React, { useEffect, useRef, useState } from "react";
import "./Team.css";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // ✅ Fetch Team Members from Backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/teammembers`);
        if (res.data.success) {
          // ✅ Only show published members
          const publishedMembers = res.data.data.filter(m => m.published === true);
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

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="team-section">
      <h2 className="team-title">Meet Our Amazing Team</h2>

      {loading ? (
        <p className="team-loading">Loading team members...</p>
      ) : teamMembers.length === 0 ? (
        <p className="team-no-data">No team members available</p>
      ) : (
        <div className="team-carousel-container">
          <button className="team-nav left" onClick={() => scroll("left")}>
            <FaArrowLeft />
          </button>

          <motion.div
            className="team-carousel"
            ref={carouselRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                className="team-member"
                whileHover={{ scale: 1.05, zIndex: 2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="team-member-card">
                  <div className="team-card-header">
                   <img
                      src={
                        member.imageUrl
                          ? `${BASE_URL.replace("/api", "")}${member.imageUrl}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={member.name}
                      className="team-member-img"
                    />

                    <div className="team-role-tag">{member.designation}</div>
                  </div>
                  <div className="team-member-info">
                    <h3 className="team-member-name">{member.name}</h3>
                    <p className="team-member-experience">
                      {member.experience ? `${member.experience} Experience` : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <button className="team-nav right" onClick={() => scroll("right")}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Team;
