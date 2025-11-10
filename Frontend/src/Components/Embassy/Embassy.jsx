import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "./Embassy.css";
import BASE_URL from "../../Api";

const Embassy = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visas/published/${id}`);
        setVisa(res.data.data);
      } catch (err) {
        console.error("Error fetching visa details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
  }, [id]);

  if (loading) {
    return (
      <div className="embassy-loader">
        <div className="spinner"></div>
        <p className="loading-text">Fetching latest visa details...</p>
      </div>
    );
  }

  if (!visa) {
    return <p className="error-text">⚠️ Visa not found or not published.</p>;
  }

  const cleanDescription = DOMPurify.sanitize(visa.description);

  return (
    <div className="embassy-wrapper">
      {/* === Country Header Section === */}
      <div className="embassy-header">
        <h1 className="embassy-title">
          🌍 {visa.country} <span>Visa Details</span>
        </h1>
        <div className="embassy-divider"></div>
        <p className="embassy-subtitle">
          Get complete visa insights, processing time, fees & more.
        </p>
      </div>

      {/* === Description Section === */}
      <div
        className="embassy-description fade-in"
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      ></div>

      {/* === Visa Info Section === */}
      <div className="embassy-info fade-up">
        <h2 className="info-title">📘 Visa Overview</h2>
        <div className="info-grid">
          <div className="info-box">
            <h3>⏰ Processing Time</h3>
            <p>{visa.processingTime || "Information not available"}</p>
          </div>
          <div className="info-box">
            <h3>💰 Starting Price</h3>
            <p>{visa.startingPrice || "Varies by category"}</p>
          </div>
          <div className="info-box">
            <h3>✅ Approval Tagline</h3>
            <p>{visa.approvalTagline || "Fast and easy processing"}</p>
          </div>
          {visa.expert && (
            <div className="info-box">
              <h3>👨‍💼 Expert</h3>
              <p>{visa.expert}</p>
            </div>
          )}
        </div>
      </div>

      {/* === Last Updated === */}
      <div className="last-updated">
        <p>
          <span className="update-icon">🕓</span> Last Updated:{" "}
          <strong>
            {new Date(visa.updatedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Embassy;
