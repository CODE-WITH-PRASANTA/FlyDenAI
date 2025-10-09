import React from "react";
import { motion } from "framer-motion";
import "./AllVisaAvalable.css";

// Assets
import visa1 from "../../assets/visa-1.webp";
import visa2 from "../../assets/visa-2.webp";
import visa3 from "../../assets/visa-3.webp";
import visa4 from "../../assets/visa-4.webp";

const AllVisaAvalable = () => {
  const visaData = [
    {
      id: "01",
      title: "Student Visa",
      desc: "Foresee the pain and trouble that are bound ensue.",
      list: ["F1 Student Visa", "J1 Exchange Visitor Visa", "Non-Academic Visa"],
      image: visa1,
    },
    {
      id: "02",
      title: "Residence Visa",
      desc: "Desire that they can foresee trouble bound ensue.",
      list: ["Permanent Visa", "Humanitarian Residence", "Temporary Visa"],
      image: visa2,
    },
    {
      id: "03",
      title: "Business Visa",
      desc: "Equally blame belongs those who fail in their duty.",
      list: ["Business Visa", "Employment Visa", "Project Visa"],
      image: visa3,
    },
    {
      id: "04",
      title: "Tourist Visa",
      desc: "Foresee the pain and trouble that are bound ensue.",
      list: ["F1 Student Visa", "J1 Exchange Visitor Visa", "Non-Academic Visa"],
      image: visa4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 60,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95, rotate: -2 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.3,
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
    hover: {
      y: -15,
      scale: 1.05,
      rotate: 1,
      boxShadow: "0 25px 50px rgba(233, 78, 119, 0.3)",
      transition: { type: "spring", stiffness: 250, damping: 20 },
    },
  };

  return (
    <motion.section
      className="AllVisaAvalable-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="AllVisaAvalable-header"
        variants={containerVariants}
      >
        <p className="AllVisaAvalable-subtitle">VISA CATEGORIES</p>
        <h2 className="AllVisaAvalable-title">
          Enabling Your Immigration <br /> Successfully
        </h2>
      </motion.div>

      <motion.div
        className="AllVisaAvalable-container"
        variants={containerVariants}
      >
        {visaData.map((visa, index) => (
          <motion.div
            className="AllVisaAvalable-card"
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="AllVisaAvalable-image"
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.5 }}
            >
              <img src={visa.image} alt={visa.title} />
            </motion.div>

            <div className="AllVisaAvalable-content">
              <motion.h4
                className="AllVisaAvalable-number"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {visa.id}.
              </motion.h4>

              <motion.h3
                className="AllVisaAvalable-name"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {visa.title}
              </motion.h3>

              <motion.p
                className="AllVisaAvalable-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {visa.desc}
              </motion.p>

              <motion.ul
                className="AllVisaAvalable-list"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {visa.list.map((item, i) => (
                  <li key={i}>
                    <span>➜</span> {item}
                  </li>
                ))}
              </motion.ul>

              <div className="AllVisaAvalable-footer">
                <motion.a
                  href="#"
                  className="AllVisaAvalable-readmore"
                  whileHover={{
                    color: "#E94E77",
                    x: 5,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  READ MORE
                </motion.a>
                <motion.span
                  className="AllVisaAvalable-dots"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                >
                  •••
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default AllVisaAvalable;
