import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VisaServiceSection.css";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

const VisaServiceSection = () => {
  const navigate = useNavigate();
  const [visaTypes, setVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch visa data from backend
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visatypes`);
        if (res.data.success) {
          setVisaTypes(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching visa types:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisas();
  }, []);

  // 🚀 Navigate to details page
  const handleLearnMore = (id) => {
    navigate(`/visa-info/${id}`);
  };

  if (loading) {
    return <p className="loading-text">Loading visa categories...</p>;
  }

  return (
    <section className="visa-section">
      <p className="section-subtitle">Our Visa Services</p>
      <h2 className="VisaService-tittle">
        Simplify Your Visa Process with Expert Assistance
      </h2>

      <div className="visa-scroll-container">
        <div className="visaServicesec-card-grid">
          {visaTypes.map((visa, index) => {
            // ✅ Construct image URL using BASE_URL (removes hardcoding)
            const base = BASE_URL.replace("/api", ""); // e.g., http://localhost:5000
            const imageSrc = visa.visaImageUrl?.startsWith("http")
              ? visa.visaImageUrl
              : `${base}${visa.visaImageUrl}`;

            return (
              <div key={visa._id} className="visaServicesec-card">
                <div className="visa-image-wrapper">
                  <img
                    src={imageSrc || "/default-visa.webp"}
                    alt={visa.visaName}
                    className="visa-image"
                  />
                  <div className="visa-icon-bg">🌍</div>
                </div>

                <div className="visa-content">
                  <div className="visa-id">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                  <div className="visaServicesec-title">{visa.visaName}</div>
                  <p className="visa-description">
                    {visa.visaOverview
                      ? visa.visaOverview.slice(0, 150) + "..."
                      : visa.visaDesc.slice(0, 150) + "..."}
                  </p>

                  <a
                    className="visa-link"
                    onClick={() => handleLearnMore(visa._id)}
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VisaServiceSection;
