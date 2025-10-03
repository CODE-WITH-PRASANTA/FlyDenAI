import React from "react";
import { FaEnvelope, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./TeamSec.css";
import director from "../../assets/director.webp";
import ts2 from "../../assets/ts2.webp";
import ts3 from "../../assets/ts3.webp";
import ts4 from "../../assets/ts4.webp";
import ts5 from "../../assets/ts5.webp";
import ts6 from "../../assets/ts6.webp";
import ts7 from "../../assets/ts7.webp";
import ts8 from "../../assets/ts8.webp";

const teamMembers = [
  { name: "Alex Sam Martin", role: "Director", img: director, active: false },
  { name: "David Coper", role: "Officer", img: ts2, active: true },
  { name: "Melika Fonals", role: "Director", img: ts3, active: false },
  { name: "Sophia Arthur", role: "Director", img: ts4, active: false },
  { name: "Natalia Zox", role: "Officer", img: ts5, active: false },
  { name: "Annia Konikova", role: "Officer", img: ts6, active: false },
  { name: "Lumber Jackman", role: "Officer", img: ts7, active: false },
  { name: "Danny Coorsh", role: "Officer", img: ts8, active: false },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // slightly slower for smoother stagger
    },
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
              key={index}
              className={`teamsec-card ${member.active ? "active" : ""}`}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="teamsec-img"
                whileHover={{ rotate: 10, scale: 1.15 }}
                animate={{
                  y: [0, -6, 0], // slower floating
                  transition: { duration: 5 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <img src={member.img} alt={member.name} />
              </motion.div>

              <motion.h3
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.3 + index * 0.15, duration: 0.6, ease: "easeOut" } }}
              >
                {member.name}
              </motion.h3>
              <motion.p
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.35 + index * 0.15, duration: 0.6, ease: "easeOut" } }}
              >
                {member.role}
              </motion.p>

              <motion.div className="teamsec-icons" variants={iconVariants} whileHover="hover">
                <span className="teamsec-icon"><FaEnvelope /></span>
                <span className="teamsec-divider"></span>
                <span className="teamsec-icon"><FaShareAlt /></span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSec;
