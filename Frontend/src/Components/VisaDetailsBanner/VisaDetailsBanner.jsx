import React, { useEffect, useState } from "react";
import "./VisaDetailsBanner.css";
import { FaRegClock, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Api";

const VisaDetailsBanner = () => {
  const { id } = useParams();

  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safely parse price values
  const parsePriceSafe = (raw) => {
    if (raw === null || raw === undefined) return NaN;

    if (typeof raw === "number" && !Number.isNaN(raw)) {
      return raw;
    }

    const cleaned = String(raw).replace(/[^\d.-]/g, "");

    const match = cleaned.match(/-?\d+(?:\.\d+)?/);

    if (!match) return NaN;

    return parseFloat(match[0]);
  };

  // Format price in Indian currency
  const formatPrice = (raw) => {
    const num = parsePriceSafe(raw);

    if (!Number.isFinite(num)) {
      return "N/A";
    }

    const formatted = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

    return `₹${formatted} /-`;
  };

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/visas/published/${id}`
        );

        console.log("Visa API response:", res.data);

        if (res.data && res.data.success) {
          setVisa(res.data.data);
        } else {
          console.warn(
            "Visa fetch returned no data or success=false",
            res.data
          );

          setVisa(null);
        }
      } catch (error) {
        console.error(
          "Error fetching visa details:",
          error
        );

        setVisa(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVisaDetails();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <section className="visadetailsbanner visadetailsbanner--loading">
        <div className="visadetailsbanner-loading">
          <div className="visadetailsbanner-spinner"></div>

          <div className="visadetailsbanner-loading-content">
            <span className="visadetailsbanner-loading-brand">
              Flyixo
            </span>

            <p>Loading visa details...</p>
          </div>
        </div>
      </section>
    );
  }

  // Not found state
  if (!visa) {
    return (
      <section className="visadetailsbanner visadetailsbanner--notfound">
        <div className="visadetailsbanner-notfound-card">
          <div className="visadetailsbanner-notfound-icon">
            !
          </div>

          <span className="visadetailsbanner-notfound-brand">
            Flyixo
          </span>

          <h2>Visa Details Not Found</h2>

          <p>
            We couldn't find the visa details you're looking
            for.
          </p>
        </div>
      </section>
    );
  }

  const bannerImageUrl = visa.bannerUrl
    ? `${BASE_URL.replace("/api", "")}${visa.bannerUrl}`
    : "";

  return (
    <section
      className="visadetailsbanner"
      style={{
        backgroundImage: bannerImageUrl
          ? `url(${bannerImageUrl})`
          : "none",
      }}
    >
      {/* Background Effects */}
      <div className="visadetailsbanner-background"></div>

      <div className="visadetailsbanner-overlay">
        <div className="visadetailsbanner-container">
          <div className="visadetailsbanner-content">

            {/* Brand */}
            <div className="visadetailsbanner-brand">
              <span className="visadetailsbanner-brand-dot"></span>
              <span>Flyixo</span>
            </div>

            {/* Main Heading */}
            <h1 className="visadetailsbanner-title">
              {visa.country} Visa
            </h1>

            {/* Description */}
            <p className="visadetailsbanner-description">
              Explore visa requirements, processing details
              and application information for {visa.country}.
            </p>

            {/* Approval Badge */}
            {visa.approvalTagline && (
              <div className="visadetailsbanner-badge">
                <FaCheckCircle className="visadetailsbanner-badgeicon" />

                <span>
                  <strong>
                    {visa.approvalTagline}
                  </strong>
                </span>
              </div>
            )}

            {/* Information Cards */}
            <div className="visadetailsbanner-info">

              {/* Processing Time */}
              <div className="visadetailsbanner-item">
                <div className="visadetailsbanner-item-icon">
                  <FaRegClock />
                </div>

                <div className="visadetailsbanner-item-content">
                  <p className="visadetailsbanner-label">
                    Processing Time
                  </p>

                  <h2 className="visadetailsbanner-value">
                    {visa.processingTime || "N/A"}
                  </h2>
                </div>
              </div>

              {/* Starting Price */}
              <div className="visadetailsbanner-item">
                <div className="visadetailsbanner-price-icon">
                  ₹
                </div>

                <div className="visadetailsbanner-item-content">
                  <p className="visadetailsbanner-label">
                    Starting From
                  </p>

                  <h2 className="visadetailsbanner-value">
                    {formatPrice(visa.startingPrice)}
                  </h2>
                </div>
              </div>

            </div>

            {/* Bottom Trust Text */}
            <div className="visadetailsbanner-trust">
              <span className="visadetailsbanner-trust-line"></span>

              <span>
                Trusted visa assistance by{" "}
                <strong>Flyixo</strong>
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaDetailsBanner;