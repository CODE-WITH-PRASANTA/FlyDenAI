import React, { useEffect, useState } from "react";
import "./ServiceTestimonials.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api
import i1 from "../../assets/col-bgimage-12.jpg"; // Fallback image

const ServiceTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/testimonials`);
        if (res.data.success) {
          // Only show published testimonials
          const publishedTestimonials = res.data.data.filter(t => t.published);
          setTestimonials(publishedTestimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // ✅ Helper function to get correct image URL
  const getImageUrl = (url) => {
    if (!url) return i1; // fallback image
    if (url.startsWith("http")) return url; // full URL (like Cloudinary)
    return `${BASE_URL.replace("/api", "")}${url}`; // local uploads
  };

  return (
    <section className="service-testimonials-section">
      <div className="service-testimonials-container">
        <div className="service-testimonials-left">
          <h4 className="service-testimonials-subtitle">TESTIMONIALS</h4>
          <h2 className="service-testimonials-title">
            Feedback from our <span>Clients</span>
          </h2>

          {/* Loader */}
          {loading ? (
            <p className="loading-text">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="no-data-text">No testimonials available yet.</p>
          ) : (
            <div className="service-testimonials-cards">
              {testimonials.map((t, index) => (
                <div key={t._id || index} className="service-testimonial-card">
                  <p className="service-testimonial-quote">"{t.message}"</p>

                  {/* Rating */}
                  <div className="service-testimonial-rating">
                    {Array.from({ length: t.rating || 0 }).map((_, i) => (
                      <FaStar key={i} color="#f39c12" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="service-testimonial-author">
                    <img
                      src={getImageUrl(t.imageUrl)}
                      alt={t.name}
                      className="service-testimonial-avatar"
                    />
                    <div>
                      <h4>{t.name}</h4>
                      <span>Client</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="service-testimonials-right">
          <img src={i1} alt="Clients" />
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
