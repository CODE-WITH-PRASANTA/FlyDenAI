import React, {
  useRef,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaGlobeAmericas,
  FaClock,
  FaArrowRight,
  FaUserTie,
  FaCheckCircle,
  FaPassport,
} from "react-icons/fa";
import "./PopularDestinations.css";
import BASE_URL from "../../Api";

const PopularDestinations = () => {
  const sliderRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [destinations, setDestinations] = useState([]);

  const navigate = useNavigate();

  // =====================================================
  // FETCH PUBLISHED VISAS
  // =====================================================

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/visas/published`
        );

        if (res.data?.success) {
          setDestinations(res.data.data || []);
        }
      } catch (err) {
        console.error(
          "Error fetching visas:",
          err
        );
      }
    };

    fetchVisas();
  }, []);

  // =====================================================
  // AUTO SLIDER
  // =====================================================

  useEffect(() => {
    const slider = sliderRef.current;

    let animationFrame;

    const scroll = () => {
      if (!slider) return;

      if (!isDragging) {
        slider.scrollLeft += 0.5;

        if (
          slider.scrollLeft >=
          slider.scrollWidth / 2
        ) {
          slider.scrollLeft = 0;
        }
      }

      animationFrame =
        requestAnimationFrame(scroll);
    };

    animationFrame =
      requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isDragging]);

  // =====================================================
  // GET IMAGE URL
  // =====================================================

  const getImageUrl = (bannerUrl) => {
    if (!bannerUrl) {
      return "/default-banner.jpg";
    }

    if (
      bannerUrl.startsWith("http://") ||
      bannerUrl.startsWith("https://")
    ) {
      return bannerUrl;
    }

    const baseUrl =
      BASE_URL.replace("/api", "");

    return `${baseUrl}${bannerUrl}`;
  };

  // =====================================================
  // GET PRICE
  // =====================================================

  const getPrice = (destination) => {
    const rawPrice =
      destination.startingPrice ||
      destination.visaTypes?.[0]?.fees ||
      0;

    const cleanedPrice = String(rawPrice).replace(
      /[^\d.]/g,
      ""
    );

    const price = parseFloat(cleanedPrice);

    return Number.isFinite(price)
      ? price.toFixed(2)
      : "0.00";
  };

  // =====================================================
  // NAVIGATE
  // =====================================================

  const handleExplore = (id) => {
    navigate(`/Visa/Details/${id}`);
  };

  return (
    <section className="popular-destination-section">
      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="popular-destination-bg popular-destination-bg-one"></div>
      <div className="popular-destination-bg popular-destination-bg-two"></div>
      <div className="popular-destination-grid"></div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="popular-destination-header">
        <div className="popular-destination-eyebrow">
          <span></span>

          <FaGlobeAmericas />

          <strong>
            FLYIXO GLOBAL DESTINATIONS
          </strong>

          <span></span>
        </div>

        <h2 className="popular-destination-title">
          Popular Visa{" "}
          <span>Destinations</span>
        </h2>

        <p className="popular-destination-subtitle">
          Discover our most loved travel
          destinations with easy visa processing,
          expert assistance, and transparent
          pricing from Flyixo.
        </p>

        <div className="popular-destination-heading-line">
          <i></i>
          <span></span>
          <i></i>
        </div>
      </div>

      {/* =================================================
          SLIDER
      ================================================= */}

      <div
        className="popular-destination-slider-wrapper"
      >
        <div
          className="popular-destination-slider"
          ref={sliderRef}
          onMouseEnter={() =>
            setIsDragging(true)
          }
          onMouseLeave={() =>
            setIsDragging(false)
          }
          onTouchStart={() =>
            setIsDragging(true)
          }
          onTouchEnd={() =>
            setIsDragging(false)
          }
        >
          {destinations.map(
            (dest, index) => (
              <article
                key={
                  dest._id || index
                }
                className="popular-destination-card"
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="popular-destination-image-wrapper">
                  <img
                    src={getImageUrl(
                      dest.bannerUrl
                    )}
                    alt={
                      dest.country ||
                      "Visa destination"
                    }
                    loading="lazy"
                    className="popular-destination-image"
                    onError={(event) => {
                      event.currentTarget.src =
                        "/default-banner.jpg";
                    }}
                  />

                  <div className="popular-destination-image-overlay"></div>

                  {/* Country badge */}
                  <div className="popular-destination-country-badge">
                    <FaGlobeAmericas />

                    <span>
                      Visa Destination
                    </span>
                  </div>

                  {/* =================================================
                      PRICE TAG
                  ================================================= */}

                  <div className="popular-destination-price-tag">
                    <span className="popular-destination-price-label">
                      BOOKING
                    </span>

                    <strong className="popular-destination-price">
                      ₹ {getPrice(dest)}
                    </strong>

                    <span className="popular-destination-price-only">
                      ONLY
                    </span>
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="popular-destination-info">
                  <div className="popular-destination-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <h3 className="popular-destination-country">
                    {dest.country}
                  </h3>

                  <div className="popular-destination-divider"></div>

                  {/* Processing Time */}
                  <div className="popular-destination-duration">
                    <span className="popular-destination-duration-icon">
                      <FaClock />
                    </span>

                    <div>
                      <small>
                        Processing Time
                      </small>

                      <strong>
                        {dest.processingTime ||
                          "Contact Us"}
                      </strong>
                    </div>
                  </div>

                  {/* =================================================
                      EXPERT
                  ================================================= */}

                  {dest.expert && (
                    <div className="popular-destination-expert">
                      <div className="popular-destination-expert-icon">
                        <FaUserTie />
                      </div>

                      <div className="popular-destination-expert-content">
                        <span>
                          Expert Consultant
                        </span>

                        <strong>
                          {dest.expert}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      APPROVAL
                  ================================================= */}

                  {dest.approvalTagline && (
                    <div className="popular-destination-approval">
                      <div className="popular-destination-approval-icon">
                        <FaCheckCircle />
                      </div>

                      <div className="popular-destination-approval-content">
                        <span>
                          Visa Assistance
                        </span>

                        <p>
                          {
                            dest.approvalTagline
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      BUTTON
                  ================================================= */}

                  <button
                    type="button"
                    className="popular-destination-btn"
                    onClick={() =>
                      handleExplore(
                        dest._id
                      )
                    }
                  >
                    <span>
                      Explore Now
                    </span>

                    <span className="popular-destination-btn-icon">
                      <FaArrowRight />
                    </span>
                  </button>
                </div>

                {/* Bottom accent */}
                <div className="popular-destination-card-accent"></div>
              </article>
            )
          )}
        </div>

        {/* Slider fade edges */}
        <div className="popular-destination-slider-fade left"></div>
        <div className="popular-destination-slider-fade right"></div>
      </div>

      {/* =================================================
          BOTTOM TRUST AREA
      ================================================= */}

      <div className="popular-destination-trust">
        <div className="popular-destination-trust-icon">
          <FaPassport />
        </div>

        <div>
          <strong>
            Explore Global Opportunities With Flyixo
          </strong>

          <span>
            Professional visa guidance for your
            international journey.
          </span>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;