import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Documents.css";
import BASE_URL from "../../Api";

const Documents = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [openSection, setOpenSection] = useState(true);
  const carouselRef = useRef(null);

  // ✅ Fetch Visa Details by ID
  useEffect(() => {
    if (!id) return;
    const fetchVisa = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/visas/published/${id}`);
        setVisa(data.data);
      } catch (err) {
        console.error("❌ Error fetching visa details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
  }, [id]);

  // ✅ Fetch Team Members (only once)
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/teammembers`);
        const base = BASE_URL.replace("/api", "");

        // Filter only published members
        const publishedMembers = data.data.filter((m) => m.published);

        // Attach absolute image URLs
        const updatedMembers = publishedMembers.map((m) => ({
          ...m,
          imageUrl: m.imageUrl?.startsWith("http")
            ? m.imageUrl
            : `${base}${m.imageUrl}`,
        }));

        setTeamMembers(updatedMembers);
      } catch (err) {
        console.error("❌ Error fetching team members:", err);
      }
    };
    fetchTeam();
  }, []);

  // ✅ Smooth infinite scrolling for the team carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let requestId;
    const scrollStep = () => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += 0.8;
      }
      requestId = requestAnimationFrame(scrollStep);
    };

    requestId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(requestId);
  }, [teamMembers]);

  if (loading) return <p className="loading-text">Loading documents...</p>;
  if (!visa) return <p className="error-text">No visa data found.</p>;

  return (
    <section id="documents" className="documents-wrapper">
      <div className="documents-container">
        <div className="documents-left">
          <h2 className="documents-title">
            Documents required for {visa.country} Visa
          </h2>

          {/* ✅ Documents Section */}
          <div className="document-section">
            <button
              className="document-toggle-btn"
              onClick={() => setOpenSection(!openSection)}
              aria-expanded={openSection}
            >
              Must have Documents for {visa.country} Visa
              <span className={`Document-arrow ${openSection ? "open" : ""}`}>
                ▼
              </span>
            </button>

            <div className={`documents-list ${openSection ? "open" : ""}`}>
              <ul>
                {visa.documents && visa.documents.length > 0 ? (
                  visa.documents.map((doc, index) => (
                    <li key={index}>📄 {doc}</li>
                  ))
                ) : (
                  <li>No documents listed for this visa.</li>
                )}
              </ul>
            </div>
          </div>

          {/* ✅ Team Members Section */}
          <div className="Document-team-section">
            <h3>Meet Our Team Of Visa Experts</h3>
            <div className="team-carousel" ref={carouselRef}>
              {teamMembers.map((member, i) => (
                <div className="Document-TeamCard" key={i}>
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="team-photo"
                  />
                  <div className="team-info">
                    <strong className="team-name">{member.name}</strong>
                    <div className="team-designation">{member.designation}</div>
                    {member.experience && (
                      <div className="doc-team-exp">
                        🧠 {member.experience} years of experience
                      </div>
                    )}
                    {member.email && (
                      <div className="team-email">📧 {member.email}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Sample Visa Card */}
          <div className="sample-visa-card">
            <div className="sample-visa-icon">📄</div>
            <div className="sample-visa-text">View Sample Visa Copy</div>
            <button className="sample-visa-btn">View Now</button>
          </div>

          {/* ✅ Last Updated */}
          <div className="last-updated">
            🕒 Last Updated:{" "}
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
      </div>
    </section>
  );
};

export default Documents;
