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

  // Safe parse: strip everything except digits and dot, then parseFloat
  const parsePriceSafe = (raw) => {
    if (raw === null || raw === undefined) return NaN;
    // if it's already a number, return it
    if (typeof raw === "number" && !Number.isNaN(raw)) return raw;
    // convert to string and remove non-digit except dot and minus
    const cleaned = String(raw).replace(/[^\d.-]/g, "");
    // handle multiple dots or stray "-" by taking first occurence of a valid float
    const match = cleaned.match(/-?\d+(\.\d+)?/);
    if (!match) return NaN;
    return parseFloat(match[0]);
  };

  // Format price as ₹x,xxx.xx /-
  const formatPrice = (raw) => {
    const num = parsePriceSafe(raw);
    if (!Number.isFinite(num)) return "N/A";
    // Format with thousand separators and two decimals
    const formatted = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
    return `₹${formatted} /-`;
  };

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visas/published/${id}`);
        console.log("Visa API response:", res.data); // <-- debug: check this object
        if (res.data && res.data.success) {
          setVisa(res.data.data);
        } else {
          console.warn("⚠️ Visa fetch returned no data or success=false", res.data);
          setVisa(null);
        }
      } catch (error) {
        console.error("❌ Error fetching visa details:", error);
        setVisa(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVisaDetails();
  }, [id]);

  if (loading) {
    return (
      <section className="visadetailsbanner loading">
        <p>Loading visa details...</p>
      </section>
    );
  }

  if (!visa) {
    return (
      <section className="visadetailsbanner notfound">
        <p>Visa details not found.</p>
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
        backgroundImage: `url(${bannerImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="visadetailsbanner-overlay">
        <div className="visadetailsbanner-content">
          <h1 className="visadetailsbanner-title">{visa.country} Visa</h1>

          {visa.approvalTagline && (
            <div className="visadetailsbanner-badge">
              <FaCheckCircle className="visadetailsbanner-badgeicon" />
              <span>
                <strong>{visa.approvalTagline}</strong>
              </span>
            </div>
          )}

          <div className="visadetailsbanner-info">
            <div className="visadetailsbanner-item">
              <p className="visadetailsbanner-label">Processing time</p>
              <h2 className="visadetailsbanner-value">
                <FaRegClock className="visadetailsbanner-icon" />{" "}
                {visa.processingTime || "N/A"}
              </h2>
            </div>

            <div className="visadetailsbanner-item">
              <p className="visadetailsbanner-label">Starting from</p>
              <h2 className="visadetailsbanner-value">
                {formatPrice(visa.startingPrice)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaDetailsBanner;
