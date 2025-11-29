import React, { useEffect, useState } from "react";
import "./AllCountryBanner.css";
import { FaSearchLocation, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bannerBg from "../../assets/Visa Bg.webp";
import BASE_URL from "../../Api"; // e.g., "http://localhost:5000/api"

const AllCountryBanner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch published visas (only country + id)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visas/published`);
        const visaData = res.data.data || [];
        setCountries(visaData);
      } catch (err) {
        console.error("❌ Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // 🔹 Filter countries dynamically
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries([]);
      return;
    }

    const filtered = countries.filter((visa) =>
      visa.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  // 🔹 Navigate to visa details
  const handleCountryClick = (visaId) => {
    navigate(`/Visa/Details/${visaId}`);
  };

  return (
    <section
      className="allcountry-banner"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      <div className="allcountry-overlay"></div>

      {/* 🌍 Top Badge */}
      <motion.div
        className="allcountry-badge"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🌍 Trusted by <span>900+ Travelers</span> Worldwide
      </motion.div>

      <div className="allcountry-content">
        <motion.h1
          className="allcountry-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span>Fast, Reliable</span> & Hassle-Free Visa Services
        </motion.h1>

        <motion.p
          className="allcountry-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Apply for your visa online in minutes. Track real-time updates and get
          expert assistance for any destination — anytime, anywhere.
        </motion.p>

        {/* 🔍 Search Box */}
        <motion.div
          className="allcountry-searchbox"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
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

        {/* 🌎 Search Suggestions */}
        {filteredCountries.length > 0 && (
          <motion.div
            className="allcountry-suggestions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {filteredCountries.map((visa) => (
              <motion.div
                key={visa._id}
                className="allcountry-country"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCountryClick(visa._id)}
              >
                {visa.country}
              </motion.div>
            ))}
          </motion.div>
        )}

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
