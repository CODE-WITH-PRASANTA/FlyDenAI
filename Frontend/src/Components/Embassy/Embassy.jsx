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
        const res = await axios.get(
          `${BASE_URL}/visas/published/${id}`
        );

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
      <div className="flyixo-embassy-loader">
        <div className="flyixo-embassy-spinner"></div>

        <p className="flyixo-embassy-loading-text">
          Fetching latest visa details...
        </p>
      </div>
    );
  }

  if (!visa) {
    return (
      <div className="flyixo-embassy-error">
        <div className="flyixo-embassy-error-icon">!</div>

        <h3>Visa Information Unavailable</h3>

        <p>
          Visa details could not be found or this visa is not currently
          published.
        </p>
      </div>
    );
  }

  const cleanDescription = DOMPurify.sanitize(
    visa.description || ""
  );

  return (
    <section className="flyixo-embassy">
      <div className="flyixo-embassy-container">

        {/* =========================================
            HEADER
        ========================================= */}
        <header className="flyixo-embassy-header">
          <span className="flyixo-embassy-eyebrow">
            Visa Information
          </span>

          <h1 className="flyixo-embassy-title">
            {visa.country}{" "}
            <span>Visa Details</span>
          </h1>

          <div className="flyixo-embassy-divider">
            <span></span>
          </div>

          <p className="flyixo-embassy-subtitle">
            Get complete visa insights, processing time, fees and
            everything you need to know about your visa journey.
          </p>
        </header>

        {/* =========================================
            DESCRIPTION
        ========================================= */}
        <article className="flyixo-embassy-description">
          <div className="flyixo-embassy-description-label">
            <span className="flyixo-embassy-description-icon">
              i
            </span>

            <span>About {visa.country} Visa</span>
          </div>

          <div
            className="flyixo-embassy-description-content"
            dangerouslySetInnerHTML={{
              __html: cleanDescription,
            }}
          />
        </article>

        {/* =========================================
            VISA OVERVIEW
        ========================================= */}
        <section className="flyixo-embassy-overview">
          <div className="flyixo-embassy-overview-header">
            <span className="flyixo-embassy-overview-eyebrow">
              Quick Information
            </span>

            <h2 className="flyixo-embassy-overview-title">
              Visa Overview
            </h2>

            <p className="flyixo-embassy-overview-subtitle">
              Important information about the {visa.country} visa
              application process.
            </p>
          </div>

          <div className="flyixo-embassy-info-grid">

            {/* Processing Time */}
            <div className="flyixo-embassy-info-card">
              <div className="flyixo-embassy-info-icon">
                ⏱
              </div>

              <div className="flyixo-embassy-info-content">
                <span>Processing Time</span>

                <strong>
                  {visa.processingTime ||
                    "Information not available"}
                </strong>
              </div>
            </div>

            {/* Starting Price */}
            <div className="flyixo-embassy-info-card">
              <div className="flyixo-embassy-info-icon">
                ₹
              </div>

              <div className="flyixo-embassy-info-content">
                <span>Starting Price</span>

                <strong>
                  {visa.startingPrice ||
                    "Varies by category"}
                </strong>
              </div>
            </div>

            {/* Approval */}
            <div className="flyixo-embassy-info-card">
              <div className="flyixo-embassy-info-icon">
                ✓
              </div>

              <div className="flyixo-embassy-info-content">
                <span>Approval</span>

                <strong>
                  {visa.approvalTagline ||
                    "Fast and easy processing"}
                </strong>
              </div>
            </div>

            {/* Expert */}
            {visa.expert && (
              <div className="flyixo-embassy-info-card">
                <div className="flyixo-embassy-info-icon">
                  👤
                </div>

                <div className="flyixo-embassy-info-content">
                  <span>Visa Expert</span>

                  <strong>{visa.expert}</strong>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================
            LAST UPDATED
        ========================================= */}
        <div className="flyixo-embassy-updated">
          <span className="flyixo-embassy-updated-icon">
            ↻
          </span>

          <span>
            Last Updated
          </span>

          <strong>
            {new Date(visa.updatedAt).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </strong>
        </div>

      </div>
    </section>
  );
};

export default Embassy;