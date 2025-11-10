import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Api";

import slider1 from "../../assets/slider1.webp";
import slider2 from "../../assets/slider2.webp";

const slides = [
  { id: 1, type: "image", img: slider1 },
  { id: 2, type: "split", img: slider2 },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch contact data
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/contacts`);
        const publishedContact = res.data.data.find((c) => c.published === true);
        setContact(publishedContact || res.data.data[0]); // fallback to first if none published
      } catch (err) {
        console.error("❌ Error fetching contact:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  // ✅ Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="overlay"></div>

          {/* Slide Type 1 */}
          {slide.type === "image" && (
            <div className="hero-content left">
              <p className="hero-subtitle">
                Explore <span>Study</span> & <span>Intern Abroad</span> Opportunities
              </p>
              <h1>
                Build Your <span className="highlight">Global Career</span> With Ease
              </h1>
              <ul>
                <li>🌍 Apply to Top Global Universities</li>
                <li>💼 Secure Paid Internships Abroad</li>
                <li>🎓 Full Visa Assistance & Guidance</li>
              </ul>

              <div className="hero-buttons">
                <button
                  className="hero-btn hero-btn-primary"
                  onClick={() => navigate("/StudyAbroad")}
                >
                  Start Application
                </button>

                {!loading && contact ? (
                 <a href={`tel:${contact.phone}`} className="hero-btn hero-btn-secondary">
                      📞 +91 {contact.phone}
                    </a>

                ) : (
                  <span className="hero-btn hero-btn-secondary disabled">Loading...</span>
                )}
              </div>
            </div>
          )}

          {/* Slide Type 2 */}
          {slide.type === "split" && (
            <div className="hero-content right">
              <p className="hero-subtitle">
                Your Trusted Partner for <span>Study</span>, <span>Internship</span> &{" "}
                <span>Visa</span>
              </p>
              <h1>
                Quick & Reliable <span className="highlight">Visa Booking</span> Support
              </h1>
              <ul>
                <li>✅ Simple Process, Fast Approval</li>
                <li>🧳 Expert Visa & Travel Support</li>
                <li>💡 Apply With Confidence</li>
              </ul>

              <div className="hero-buttons">
                {!loading && contact ? (
                  <>
                   <a href={`tel:${contact.phone}`} className="hero-btn hero-btn-secondary">
                          📞 +91 {contact.phone}
                        </a>

                    {contact.whatsapp && (
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-btn hero-btn-secondary"
                      >
                        💬 Chat on WhatsApp
                      </a>
                    )}
                  </>
                ) : (
                  <span className="hero-btn hero-btn-secondary disabled">Loading...</span>
                )}

                <button
                  className="hero-btn hero-btn-primary"
                  onClick={() => navigate("/AllCountry")}
                >
                  Book Visa Now
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
