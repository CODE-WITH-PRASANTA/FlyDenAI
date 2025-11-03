import React, { useEffect, useState } from "react";
import "./TeamSection.css";
import axios from "axios";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api
import i1 from "../../assets/col-bgimage-12.jpg"; // Fallback image

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch team members from backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/teammembers`);
        setTeam(response.data.data || []);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Failed to load team members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // ✅ Helper: Generate correct image URL path
  const getImagePath = (imageUrl) => {
    if (!imageUrl) return i1; // fallback
    if (imageUrl.startsWith("http")) return imageUrl; // already full URL (e.g., Cloudinary)
    return `${BASE_URL.replace("/api", "")}${imageUrl}`; // local upload path
  };

  return (
    <div className="team-container">
     <h1>
        Your Trusted <span>Visa & Study Abroad Consultants</span>
      </h1>
      <p>
        Our dedicated and friendly experts specialize in visa assistance, study abroad guidance, and overseas internship
        placements.  
        With years of experience and a client-first approach, we ensure every applicant receives the right advice,
        accurate documentation support, and end-to-end consultation for a smooth international journey.
      </p>


      {loading ? (
        <div className="loading">Loading team members...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="team-list">
          {team.map((member) => (
            <div className="team-card" key={member._id}>
              <img
                src={getImagePath(member.imageUrl)}
                alt={member.name}
                className="team-avatar"
              />
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.designation}</div>
                {member.experience && (
                  <div className="team-exp">
                    Experience: {member.experience}
                  </div>
                )}
                <div className="team-icons">
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="teamsec-icon-box"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="teamsec-icon-box"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="teamsec-icon-box"
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {member.whatsapp && (
                    <a
                      href={`https://wa.me/${member.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="teamsec-icon-box"
                    >
                      <FaWhatsapp />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="teamsec-icon-box"
                    >
                      <FaLinkedinIn />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
