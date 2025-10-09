import React from "react";
import "./CompanyReport.css";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

// Assets
import ReportImg from "../../assets/statistics-1.webp";

const CompanyReport = () => {
  return (
    <section className="CompanyReport-section">
      <div className="CompanyReport-container">
        {/* Left Image */}
        <motion.div
          className="CompanyReport-image"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={ReportImg} alt="Company Report" />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="CompanyReport-content"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="CompanyReport-subtitle"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            COMPANY REPORTS & STATISTICS
          </motion.p>

          <motion.h2
            className="CompanyReport-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Impact of <br /> Our Competitive Efforts
          </motion.h2>

          <motion.p
            className="CompanyReport-desc"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We strive for excellence and achieve remarkable results in visa
            processing, helping our clients realize their dreams efficiently.
          </motion.p>

          <div className="CompanyReport-stats">
            {[
              { label: "Student Visa", percent: 78 },
              { label: "Residence Visa", percent: 92 },
              { label: "Business Visa", percent: 65 },
              { label: "Tourist Visa", percent: 86 },
            ].map((item, index) => (
              <motion.div
                className="CompanyReport-bar"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <span>{item.label}</span>
                <div className="CompanyReport-progress">
                  <motion.div
                    className="CompanyReport-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  ></motion.div>
                  <span className="CompanyReport-percent">{item.percent}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="CompanyReport-download"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <FaFilePdf className="CompanyReport-pdfIcon" />
            <div>
              <p className="CompanyReport-downloadText">DOWNLOAD</p>
              <p className="CompanyReport-downloadTitle">
                Report for the Year 2020
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyReport;
