import React, { useEffect, useState } from "react";
import "./DirectorProfile.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import director from "../../assets/director.webp"; // static image for all directors
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

const DirectorProfile = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch director data from backend
  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/director/get`);
        setDirectors(response.data);
      } catch (error) {
        console.error("❌ Error fetching directors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDirectors();
  }, []);

  if (loading) {
    return <div className="director-loading">Loading directors...</div>;
  }

  return (
    <div className="DirectorProfile-container">
      {directors.length > 0 ? (
        directors.map((dir, index) => (
          <div className="DirectorProfile-card" key={index}>
            {/* ✅ Director Image */}
            <div className="DirectorProfile-image">
              <img src={director} alt="Director" />
            </div>

            {/* ✅ Director Details */}
            <div className="DirectorProfile-details">
              <span className="DirectorProfile-role">
                {dir.designation || "Director"}
              </span>
              <h2 className="DirectorProfile-name">{dir.name}</h2>

              <p className="DirectorProfile-description">
                {dir.about ||
                  "No description available for this director currently."}
              </p>

              {/* ✅ Contact Section */}
              <div className="DirectorProfile-contact">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <span className="contact-title">Address:</span>
                    <p>{dir.address || "Address not available"}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <FaPhoneAlt className="contact-icon" />
                  <div>
                    <span className="contact-title">Phone:</span>
                    <p>{dir.phone || "N/A"}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <span className="contact-title">Email:</span>
                    <p>{dir.email || "N/A"}</p>
                  </div>
                </div>
              </div>
            <a
              href={`tel:${dir.phone || ""}`}
              className="contact-button"
              onClick={(e) => {
                if (!dir.phone) {
                  e.preventDefault();
                  alert("Phone number not available!");
                }
              }}
            >
              Contact Team
            </a>

            </div>
          </div>
        ))
      ) : (
        <p className="no-director">No director data available.</p>
      )}
    </div>
  );
};

export default DirectorProfile;
