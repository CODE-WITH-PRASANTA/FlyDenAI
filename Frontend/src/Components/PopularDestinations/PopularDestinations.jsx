import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PopularDestinations.css";
import BASE_URL from "../../Api";

const PopularDestinations = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch published visas
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visas/published`);
        if (res.data.success) setDestinations(res.data.data);
      } catch (err) {
        console.error("❌ Error fetching visas:", err);
      }
    };
    fetchVisas();
  }, []);

  // ✅ Auto slider scroll
  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;

    const scroll = () => {
      if (!slider) return;
      if (!isDragging) {
        slider.scrollLeft += 0.5;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  return (
    <section className="PopularDestination-section">
      <h2 className="PopularDestination-title">🌍 Popular Visa Destinations</h2>
      <p className="PopularDestination-subtitle">
        Discover our most loved travel destinations with easy visa processing and affordable pricing.
      </p>

      <div
        className="PopularDestination-slider"
        ref={sliderRef}
        onMouseEnter={() => setIsDragging(true)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {destinations.map((dest, index) => (
          <div key={index} className="PopularDestination-card">
            <div className="PopularDestination-imageWrapper">
              <img
                src={
                  dest.bannerUrl
                    ? `${BASE_URL.replace("/api", "")}${dest.bannerUrl}`
                    : "/default-banner.jpg"
                }
                alt={dest.country}
                loading="lazy"
                className="PopularDestination-image"
              />
              <div className="PopularDestination-priceTag">
                <span>BOOKING</span>
                <span className="PopularDestination-price">
                  ₹{" "}
                  {parseFloat(
                    dest.startingPrice?.replace(/[^\d.]/g, "") ||
                      dest.visaTypes?.[0]?.fees ||
                      0
                  ).toFixed(2)}{" "}
                  /-
                </span>
                <span>ONLY</span>
              </div>
            </div>

            <div className="PopularDestination-info">
              <h3 className="PopularDestination-country">{dest.country}</h3>
              <p className="PopularDestination-duration">
                ⏳ Processing Time: <strong>{dest.processingTime}</strong>
              </p>

              {/* ✅ Expert / Consultant Section */}
              {dest.expert && (
                <div className="PopularDestination-expert">
                  <h4>Consultant:</h4>
                  <p>{dest.expert}</p>
                </div>
              )}

              {/* ✅ Approval Tagline Section */}
              {dest.approvalTagline && (
                <div className="PopularDestination-approval">
                  <h4>Note :</h4>
                  <p>{dest.approvalTagline}</p>
                </div>
              )}

              <button
                className="PopularDestination-btn"
                onClick={() => navigate(`/Visa/Details/${dest._id}`)}
              >
                Explore Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
