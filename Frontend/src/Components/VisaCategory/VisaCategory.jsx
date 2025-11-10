import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "./VisaCategory.css";
import BASE_URL from "../../Api";

function VisaCategory() {
  const navigate = useNavigate();
  const [visaCategories, setVisaCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch data from backend
  useEffect(() => {
    const fetchVisaCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/visatypes`);
        if (response.data.success) {
          setVisaCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching visa categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisaCategories();
  }, []);

  // 🔗 Navigate to Visa Info page
  const handleLearnMore = (id) => {
    navigate(`/visa-info/${id}`);
  };

  if (loading) {
    return (
      <section className="visa-category-section">
        <div className="visa-loading">
          <div className="loading-spinner"></div>
          <h2>Loading Visa Categories...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="visa-category-section">
    <div className="visa-category-header">
          <h2>
            Discover Our <span className="highlight">Visa Consultation Categories</span>
          </h2>
          <p>
            We provide expert visa consultation for a wide range of purposes — including
            <strong> Tourist Visa</strong> for travel, <strong>Student Visa</strong> for
            higher education, <strong>Business Visa</strong> for corporate expansion,
            <strong> Job Visa</strong> for overseas employment, and
            <strong> Family Visa</strong> for reuniting with loved ones.  
            <br />  
            Get complete guidance from application to approval, tailored to your needs.
          </p>
        </div>


      <div className="visa-category-scroll">
        {visaCategories.length > 0 ? (
          visaCategories.map((category) => (
            <div key={category._id} className="VisaCategory-card">
              <div className="visa-img-wrapper">
                <img
                  src={
                    category.visaImageUrl?.startsWith("http")
                      ? category.visaImageUrl
                      : `${BASE_URL.replace("/api", "")}${category.visaImageUrl}`
                  }
                  alt={category.visaName}
                  className="VisaCategory-image"
                  loading="lazy"
                />
              </div>

              <h3 className="visa-title">{category.visaName}</h3>

             {/* 🧩 Display visaOverview instead of visaOverview */}
              <p
                className="visacategory-description"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    category.visaOverview
                      ? category.visaOverview.slice(0, 180) + "..."
                      : "Visa process information coming soon..."
                  ),
                }}
              ></p>


              <button
                className="visa-btn"
                onClick={() => handleLearnMore(category._id)}
              >
                Learn More
              </button>
            </div>
          ))
        ) : (
          <p className="no-data-text">No Visa Categories Found</p>
        )}
      </div>
    </section>
  );
}

export default VisaCategory;
