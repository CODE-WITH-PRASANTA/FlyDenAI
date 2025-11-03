import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllVisaAvalable.css";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

const AllVisaAvalable = () => {
  const navigate = useNavigate();
  const [visaTypes, setVisaTypes] = useState([]);

  useEffect(() => {
    const fetchVisaTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/visatypes`);
        if (response.data.success) {
          setVisaTypes(response.data.data);
        } else {
          console.warn("No visa types found in response.");
        }
      } catch (error) {
        console.error("Error fetching visa types:", error);
      }
    };

    fetchVisaTypes();
  }, []);

  const getImageUrl = (fileName) => {
    if (!fileName) return "";
    const cleanFileName = fileName.replace(/^\/?uploads\//, ""); // remove extra /uploads/
    return `${BASE_URL.replace("/api", "")}/uploads/${cleanFileName}`;
  };

  // ✅ Animation Variants (entry animation only, no hover)
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 70,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    }),
  };

  return (
    <motion.section
      className="AllVisaAvalable-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* === Section Header === */}
        <motion.div className="AllVisaAvalable-header" variants={containerVariants}>
          <p className="AllVisaAvalable-subtitle">VISA CATEGORIES</p>
          <h2 className="AllVisaAvalable-title">
            Guiding Your Visa Journey with <br /> Expert Consultation
          </h2>
        </motion.div>


      {/* === Visa Cards === */}
      <motion.div className="AllVisaAvalable-container" variants={containerVariants}>
        {visaTypes.length === 0 ? (
          <p className="no-visa-msg">No visa types available yet.</p>
        ) : (
          visaTypes.map((visa, index) => (
            <motion.div
              className="AllVisaAvalable-card"
              key={visa._id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="AllVisaAvalable-image">
                <img src={getImageUrl(visa.visaImageUrl)} alt={visa.visaName} />
              </div>

              <div className="AllVisaAvalable-content">
                <motion.h4
                  className="AllVisaAvalable-number"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {(index + 1).toString().padStart(2, "0")}.
                </motion.h4>

                <motion.h3
                  className="AllVisaAvalable-name"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {visa.visaName}
                </motion.h3>

                <motion.div
                  className="AllVisaAvalable-description"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  dangerouslySetInnerHTML={{
                    __html: visa.visaDesc
                      ? visa.visaDesc.substring(0, 250) + "..."
                      : "",
                  }}
                />

                {Array.isArray(visa.specialFeatures) && visa.specialFeatures.length > 0 && (
                  <motion.ul
                    className="AllVisaAvalable-list"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {visa.specialFeatures.slice(0, 3).map((feature, i) => (
                      <li key={i}>
                        <span>➜</span> {feature}
                      </li>
                    ))}
                  </motion.ul>
                )}

                <div className="AllVisaAvalable-footer">
                  <motion.button
                    onClick={() => navigate(`/visa-info/${visa._id}`)}
                    className="AllVisaAvalable-readmore"
                    whileHover={{
                      color: "#E94E77",
                      x: 3,
                      transition: { duration: 0.3 },
                    }}
                  >
                    READ MORE
                  </motion.button>
                  <span className="AllVisaAvalable-dots">•••</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.section>
  );
};

export default AllVisaAvalable;
