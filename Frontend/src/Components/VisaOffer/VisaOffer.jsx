import React from "react";
import { motion } from "framer-motion";
import "./VisaOffer.css";
import VisaOfferimg from "../../assets/AboutVisa.webp";

const VisaOffer = () => {
  return (
    <section className="visa-offer-section">
      <div className="visa-offer-container">
        {/* LEFT IMAGE */}
        <motion.div
          className="visa-offer-image"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={VisaOfferimg}
            alt="Visa Application"
            className="floating-image"
          />
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="visa-offer-content"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h5 className="visa-offer-subtitle">What We Offer</h5>
          <h2 className="visa-offer-title">
            Solution From <br /> Leading Visa Consultant In <br /> United States
          </h2>
          <p className="visa-offer-description">
            We provide complete guidance through every step of your visa journey.
            Our experts ensure a seamless process with top approval rates and
            stress-free documentation support.
          </p>

          <motion.div
            className="visa-offer-stats"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="visa-offer-circle pulse-animation">
              <div className="visa-offer-year">
                <p>Year of</p>
                <h4>2020</h4>
              </div>
            </div>

            <div className="visa-offer-approval fade-in">
              <h3>
                <span className="visa-offer-percent">84%</span> Visa’s Approved
              </h3>
              <p>
                Our experienced consultants maintain a consistent visa approval
                rate by handling each case with attention and accuracy.
              </p>
            </div>
          </motion.div>

          {/* CALL TO ACTION BUTTON */}
          <motion.a
            href="#"
            className="visa-offer-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default VisaOffer;
