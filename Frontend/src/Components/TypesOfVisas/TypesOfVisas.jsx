import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TypesOfVisas.css";
import { ChevronRight } from "lucide-react";
import BASE_URL from "../../Api";

import defaultProfile from "../../assets/avatar-5.webp";
import au2 from "../../assets/r1.webp";
import au3 from "../../assets/au3.webp";
import au4 from "../../assets/r2.webp";
import go from "../../assets/go.webp";

const TypesOfVisas = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Visa Data
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/visas/published/${id}`);
        setVisa(data.data);
      } catch (error) {
        console.error("❌ Error fetching visa:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
  }, [id]);

  const handleGoogleRedirect = () => {
    window.open("https://www.google.com/search?q=FlyDenAi+reviews", "_blank");
  };

  if (loading) return <div className="visa-loading">Loading...</div>;
  if (!visa) return <div className="visa-error">Visa not found</div>;

  const base = BASE_URL.replace("/api", "");
  const authorImage = visa.specialImageUrl
    ? `${base}${visa.specialImageUrl}`
    : defaultProfile;

  return (
    <div className="types-visa-page">
      <div className="left-content">
        <h2 className="types-title">Types of {visa.country} Visas</h2>

        {/* Visa Types */}
        <div className="TypesVisa-cards">
          {visa.visaTypes?.length > 0 ? (
            visa.visaTypes.map((type, index) => (
              <div
                className="TypesVisa-card"
                key={index}
                onClick={() =>
                  navigate(`/Apply/Now/${id}`, {
                    state: {
                      selectedType: type.name,
                      travellers: 1,
                    },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="TypesVisa-card-header">{type.name}</div>
                <div className="TypesVisa-card-details">
                  {type.processingTime && (
                    <div>
                      <span>Processing time:</span> {type.processingTime}
                    </div>
                  )}
                  {type.stayPeriod && (
                    <div>
                      <span>Stay period:</span> {type.stayPeriod}
                    </div>
                  )}
                  {type.validity && (
                    <div>
                      <span>Validity:</span> {type.validity}
                    </div>
                  )}
                  {type.category && (
                    <div>
                      <span>Visa category:</span> {type.category}
                    </div>
                  )}
                  {type.entryType && (
                    <div>
                      <span>Entry:</span> {type.entryType}
                    </div>
                  )}
                  {type.fees && (
                    <div className="visa-fees">
                      <span>Fees:</span> <strong>{type.fees}</strong>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No visa types available</div>
          )}
        </div>

        {/* Author Info */}
        <div className="author-update">
          <div className="author-info">
            <img
              src={authorImage}
              alt={visa.expert || "Expert"}
              className="author-photo"
            />
            <div>
              <strong>{visa.expert || "Admin"}</strong>
              <div className="author-role">Author</div>
            </div>
          </div>

          <div className="last-updated">
            <span>🕒 Last Updated:</span>
            <strong>
              {new Date(visa.updatedAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </strong>
          </div>
        </div>

        {/* Reviews Google Banner */}
        <div className="reviews-banner" onClick={handleGoogleRedirect}>
          <div className="review-avatars">
            <img src={au2} alt="reviewer1" />
            <img src={au3} alt="reviewer2" />
            <img src={au4} alt="reviewer3" />
          </div>

          <div className="review-text">
            <strong>FlyDenAi - Reviews</strong>
            <div className="review-details">
              <span className="review-rating">EXCELLENT ★★★★☆</span>
              <span>821 reviews on</span>
              <img src={go} alt="Google" className="google-logo" />
              <ChevronRight className="google-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypesOfVisas;
