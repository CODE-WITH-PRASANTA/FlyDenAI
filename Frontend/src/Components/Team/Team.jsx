import React, { useRef } from "react";
import "./Team.css";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ts2 from "../../assets/ts2.webp";
import ts3 from "../../assets/ts3.webp";
import ts4 from "../../assets/ts4.webp";
import ts5 from "../../assets/ts5.webp";

const teamMembers = [
  { name: "Sakshi Jambekar", role: "Senior Visa Officer", experience: "2 Years", img: ts2 },
  { name: "Airaf Shaikh", role: "Senior Visa Officer", experience: "2 Years", img: ts3 },
  { name: "Purva Sawant", role: "Senior Visa Officer", experience: "3 Years", img: ts4 },
  { name: "Pranil Shinde", role: "Senior Holiday Expert", experience: "3 Years", img: ts5 },
  { name: "Sakshi Jambekar", role: "Senior Visa Officer", experience: "2 Years", img: ts2 },
  { name: "Airaf Shaikh", role: "Senior Visa Officer", experience: "2 Years", img: ts3 },
  { name: "Purva Sawant", role: "Senior Visa Officer", experience: "3 Years", img: ts4 },
  { name: "Pranil Shinde", role: "Senior Holiday Expert", experience: "3 Years", img: ts5 },
  // Repeat members as needed...
];

const Team = () => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 280; // width + gap of one card
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="team-section">
      <h2 className="team-title">Meet Our Amazing Team</h2>

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
              key={index}
              className="team-member"
              whileHover={{ scale: 1.05, zIndex: 2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="team-member-card">
                <div className="team-card-header">
                  <img src={member.img} alt={member.name} className="team-member-img" />
                  <div className="team-role-tag">{member.role}</div>
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-experience">{member.experience}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <button className="team-nav right" onClick={() => scroll("right")}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Team;
