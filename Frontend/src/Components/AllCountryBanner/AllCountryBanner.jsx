import React, { useState } from "react";
import "./AllCountryBanner.css";
import { FaSearchLocation, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import bannerBg from "../../assets/ab1.webp";

const AllCountryBanner = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const countries = [
    "USA",
    "United Kingdom",
    "Canada",
    "Australia",
    "Dubai",
    "Singapore",
    "France",
    "Germany",
    "Thailand",
    "Japan",
  ];

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryClick = (country) => {
    setSearchTerm(country);
  };

  return (
    <section
      className="allcountry-banner"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      <div className="allcountry-overlay"></div>

      {/* 🌍 Animated Badge */}
      <motion.div
        className="allcountry-badge"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        🌍 Trusted by <span>50L+ Travelers</span> Worldwide
      </motion.div>

      <div className="allcountry-content">
        {/* ✨ Animated Title */}
        <motion.h1
          className="allcountry-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span>Fast, Reliable</span> & Hassle-Free Visa Services
        </motion.h1>

        {/* 📝 Animated Subtitle */}
        <motion.p
          className="allcountry-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Apply for your visa online in minutes. Track real-time updates and get
          expert assistance for any destination — anytime, anywhere.
        </motion.p>

        {/* 🔍 Animated Search Box */}
        <motion.div
          className="allcountry-searchbox"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <FaSearchLocation className="allcountry-icon left" />
          <input
            type="text"
            placeholder="Search your dream destination..."
            className="allcountry-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaArrowRight className="allcountry-icon right" />
        </motion.div>

        {/* 🌎 Animated Suggestions */}
        {searchTerm && (
          <motion.div
            className="allcountry-suggestions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <motion.div
                  key={index}
                  className="allcountry-country"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCountryClick(country)}
                >
                  {country}
                </motion.div>
              ))
            ) : (
              <p className="allcountry-nodata">No country found.</p>
            )}
          </motion.div>
        )}

        {/* 🎖️ Animated Ribbon */}
        <motion.div
          className="allcountry-ribbon"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.7 }}
        >
          ✅ 99.2% Visa Approval Rate | 24×7 Global Assistance
        </motion.div>
      </div>
    </section>
  );
};

export default AllCountryBanner;
