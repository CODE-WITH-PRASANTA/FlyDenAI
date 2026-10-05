import React, { useEffect, useState } from "react";
import "./AllCountryBanner.css";
import {
  FaSearchLocation,
  FaArrowRight,
  FaGlobeAmericas,
  FaCheckCircle,
  FaPassport,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bannerBg from "../../assets/Visa Bg.webp";
import BASE_URL from "../../Api";

const AllCountryBanner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const navigate = useNavigate();

  // =====================================================
  // FETCH PUBLISHED VISA DATA
  // =====================================================

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visas/published`);

        const visaData = res.data?.data || [];

        setCountries(visaData);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountries();
  }, []);

  // =====================================================
  // FILTER COUNTRIES
  // =====================================================

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCountries([]);
      return;
    }

    const searchValue = searchTerm.toLowerCase();

    const filtered = countries.filter((visa) =>
      visa?.country
        ?.toLowerCase()
        .includes(searchValue)
    );

    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  // =====================================================
  // NAVIGATE TO VISA DETAILS
  // =====================================================

  const handleCountryClick = (visaId) => {
    navigate(`/Visa/Details/${visaId}`);
  };

  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredCountries([]);
  };

  return (
    <section
      className="allcountry-banner"
      style={{
        backgroundImage: `url(${bannerBg})`,
      }}
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="allcountry-overlay"></div>

      <div className="allcountry-glow allcountry-glow-one"></div>
      <div className="allcountry-glow allcountry-glow-two"></div>

      <div className="allcountry-particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* =================================================
          TOP BADGE
      ================================================= */}

      <motion.div
        className="allcountry-badge"
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.9,
        }}
      >
        <span className="allcountry-badge-icon">
          <FaGlobeAmericas />
        </span>

        <span>
          Trusted by <strong>900+ Travelers</strong> Worldwide
        </span>
      </motion.div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="allcountry-content">
        {/* Eyebrow */}
        <motion.div
          className="allcountry-eyebrow"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <span></span>

          <FaPassport />

          <strong>FLYIXO GLOBAL VISA SERVICES</strong>

          <span></span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="allcountry-title"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
          }}
        >
          <span>Fast, Reliable</span>{" "}
          &amp; Hassle-Free Visa Services
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="allcountry-subtitle"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
        >
          Apply for your visa online in minutes. Track real-time
          updates and get expert assistance for any destination —
          anytime, anywhere with <strong>Flyixo</strong>.
        </motion.p>

        {/* =================================================
            SEARCH BOX
        ================================================= */}

        <motion.div
          className={`allcountry-searchbox ${
            searchTerm ? "has-value" : ""
          }`}
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.5,
          }}
        >
          <FaSearchLocation className="allcountry-icon left" />

          <input
            type="text"
            placeholder="Search your dream destination..."
            className="allcountry-input"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            aria-label="Search visa destinations"
          />

          {searchTerm ? (
            <button
              type="button"
              className="allcountry-clear"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          ) : (
            <span className="allcountry-search-arrow">
              <FaArrowRight />
            </span>
          )}
        </motion.div>

        {/* =================================================
            SEARCH SUGGESTIONS
        ================================================= */}

        {filteredCountries.length > 0 && (
          <motion.div
            className="allcountry-suggestions"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="allcountry-suggestions-header">
              <div>
                <FaGlobeAmericas />

                <span>Available Destinations</span>
              </div>

              <small>
                {filteredCountries.length}{" "}
                {filteredCountries.length === 1
                  ? "result"
                  : "results"}
              </small>
            </div>

            <div className="allcountry-suggestions-list">
              {filteredCountries.map((visa) => (
                <motion.button
                  type="button"
                  key={visa._id}
                  className="allcountry-country"
                  whileHover={{
                    x: 5,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    handleCountryClick(visa._id)
                  }
                >
                  <span className="allcountry-country-icon">
                    <FaGlobeAmericas />
                  </span>

                  <span className="allcountry-country-name">
                    {visa.country}
                  </span>

                  <span className="allcountry-country-arrow">
                    <FaArrowRight />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* =================================================
            NO RESULT
        ================================================= */}

        {searchTerm.trim() &&
          filteredCountries.length === 0 && (
            <motion.div
              className="allcountry-no-results"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <FaSearchLocation />

              <span>
                No visa destination found for{" "}
                <strong>"{searchTerm}"</strong>
              </span>
            </motion.div>
          )}

        {/* =================================================
            BOTTOM RIBBON
        ================================================= */}

        <motion.div
          className="allcountry-ribbon"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.7,
          }}
        >
          <span className="allcountry-ribbon-icon">
            <FaCheckCircle />
          </span>

          <span>
            99.2% Visa Approval Rate
          </span>

          <i></i>

          <span>
            24×7 Global Assistance
          </span>

          <strong>FLYIXO</strong>
        </motion.div>
      </div>

      {/* =================================================
          SIDE BRAND
      ================================================= */}

      <div className="allcountry-side-brand">
        <span>FLYIXO</span>
        <i></i>
        <small>GLOBAL VISA SOLUTIONS</small>
      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      <div className="allcountry-scroll">
        <span>EXPLORE</span>

        <div className="allcountry-scroll-line">
          <i></i>
        </div>
      </div>
    </section>
  );
};

export default AllCountryBanner;