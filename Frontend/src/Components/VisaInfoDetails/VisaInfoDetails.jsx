import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import "./VisaInfoDetails.css";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import BASE_URL from "../../Api";

const VisaInfoDetails = () => {
  const [visaList, setVisaList] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [index, setIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  // ✅ Fetch visa data
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visatypes`);
        if (res.data.success) {
          setVisaList(res.data.data);
          setFilteredVisas(res.data.data);
          setSelectedVisa(res.data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching visa data", err);
      }
    };
    fetchVisas();
  }, []);

  // ✅ Filter by search term
  useEffect(() => {
    const filtered = visaList.filter((visa) =>
      visa.visaName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVisas(filtered);
  }, [searchTerm, visaList]);

  // ✅ Filter by category click
  const handleCategoryClick = (name) => {
    const filtered = visaList.filter(
      (visa) => visa.visaName.toLowerCase() === name.toLowerCase()
    );
    setFilteredVisas(filtered);
    if (filtered.length > 0) setSelectedVisa(filtered[0]);
  };

  // ✅ Popular visa slider
  const latestVisas = visaList.slice(0, 4);
  const nextSlide = () => setIndex((prev) => (prev + 1) % latestVisas.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + latestVisas.length) % latestVisas.length);

  // ✅ Handle comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      text: commentInput,
      date: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  if (!selectedVisa)
    return <div className="visa-info-loading">Loading visa details...</div>;

  const { visaName, visaDesc, visaOverview, visaImageUrl, consultant } = selectedVisa;

  return (
    <section className="visa-info-section">
      <div className="visa-info-container">
        {/* LEFT SIDE */}
        <div className="visa-info-left">
          <h2 className="visa-info-title">{visaName}</h2>

          <div className="visa-info-image-wrapper">
            <img
              src={`${BASE_URL.replace("/api", "")}${visaImageUrl}`}
              alt={visaName}
              className="visa-info-image"
            />
          </div>

          {/* DESCRIPTION */}
          <div
            className="visa-info-description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(visaDesc || ""),
            }}
          />

          
           {/* ==== VISA PROCESS ==== */}
        {selectedVisa?.visaProcess && (
          <div className="visa-process-section">
            <h3 className="visa-process-title">Visa Process</h3>
            <div
              className="visa-process-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedVisa.visaProcess),
              }}
            />
          </div>
        )}

          {/* OVERVIEW */}
          {visaOverview && (
            <div className="visa-info-overview">
              <span className="visa-info-quote-top">❝</span>
              <p
                className="visa-info-overview-text"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(visaOverview),
                }}
              />
              <p className="visa-info-overview-author">
                ~ {consultant?.name || "Our Consultant"}
              </p>
              <span className="visa-info-quote-bottom">❞</span>
            </div>
          )}

        {/* ==== VISA FEATURES ==== */}
        {selectedVisa?.features && selectedVisa.features.length > 0 && (
                  <div className="visa-features-section">
                    <h3 className="visa-features-title">Visa Features</h3>
                    <ul className="visa-features-list">
                      {selectedVisa.features.map((feature, idx) => (
                        <li key={idx} className="visa-feature-item">
                          <span className="visa-feature-icon">✔</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
        )}
                
        {/* ==== CONSULTANT SECTION ==== */}
          {consultant && (
            <div className="consultant-section">
              <h3 className="consultant-title">Meet Our Consultant</h3>

              <div className="consultant-card">
                <div className="consultant-image-wrapper">
                  <img
                    src={
                      consultant.imageUrl
                        ? `${BASE_URL.replace("/api", "")}${consultant.imageUrl}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={consultant.name}
                    className="consultant-avatar"
                  />
                </div>

                <div className="consultant-info">
                  <h4 className="consultant-name">{consultant.name}</h4>
                  <p className="consultant-about">{consultant.about}</p>

                  <div className="consultant-social">
                    <a href="#" className="social-link facebook"><FaFacebookF /></a>
                    <a href="#" className="social-link twitter"><FaTwitter /></a>
                    <a href="#" className="social-link linkedin"><FaLinkedinIn /></a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="visa-info-sidebar">
          {/* SEARCH BOX */}
          <div className="visa-info-search">
            <h3>Search</h3>
            <div className="visa-info-search-box">
              <input
                type="text"
                placeholder="Search visa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="visa-info-search-icon" />
            </div>
          </div>

          {/* POPULAR POSTS */}
          <div className="visa-info-popular">
            <div className="visa-info-popular-header">
              <h3>Popular Posts</h3>
              <div className="visa-info-popular-controls">
                <button onClick={prevSlide}>
                  <ChevronLeft />
                </button>
                <button onClick={nextSlide}>
                  <ChevronRight />
                </button>
              </div>
            </div>
            {latestVisas.length > 0 && (
              <div className="visa-info-popular-card">
                <img
                  src={`${BASE_URL.replace("/api", "")}${latestVisas[index].visaImageUrl}`}
                  alt={latestVisas[index].visaName}
                />
                <div className="visa-info-popular-overlay">
                  <h4>{latestVisas[index].visaName}</h4>
                </div>
              </div>
            )}
          </div>

            {/* ==== VISA CATEGORIES SECTION ==== */}
            <div className="categories-section">
              <h3 className="categories-title">Visa Categories</h3>

              <ul className="categories-list">
                {visaList.map((visa, i) => (
                  <li
                    key={i}
                    className="category-item"
                    onClick={() => handleCategoryClick(visa.visaName)}
                  >
                    <span className="category-dot"></span>
                    <span className="category-name">{visa.visaName}</span>
                  </li>
                ))}
              </ul>
            </div>


          {/* ENQUIRY FORM */}
          <div className="visa-info-enquiry">
            <h2>Quick Enquiry</h2>
            <p>
              Have questions about visa processing? Fill the form and our team
              will respond soon.
            </p>
            <form>
              <div className="visa-info-form-group">
                <input type="text" placeholder="Full Name" required />
              </div>
              <div className="visa-info-form-group">
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="visa-info-form-group">
                <input type="tel" placeholder="Phone Number" required />
              </div>
              <div className="visa-info-form-group">
                <textarea rows="4" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="visa-info-btn">
                Submit Enquiry
              </button>
            </form>
          </div>

          {/* ==== SPECIAL TOP FEATURES ==== */}
            {selectedVisa?.specialFeatures && selectedVisa.specialFeatures.length > 0 && (
              <div className="special-features-section">
                <h3 className="special-features-title">Special Top Features</h3>
                <ul className="special-features-list">
                  {selectedVisa.specialFeatures.map((feature, idx) => (
                    <li key={idx} className="special-feature-item">
                      <span className="special-feature-star">★</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

        </div>
      </div>
    </section>
  );
};

export default VisaInfoDetails;
