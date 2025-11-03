import React, { useEffect, useState } from "react";
import "./HonorsAwards.css";
import awardsImg from "../../assets/RP.jpg";
import axios from "axios";
import BASE_URL from "../../Api"; // Example: http://localhost:5000/api

const HonorsAwards = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/director/get`);
        if (res.data && res.data.length > 0) {
          const allAchievements = res.data.flatMap(
            (dir) => dir.achievements || []
          );
          setCertificates(allAchievements);
        }
      } catch (error) {
        console.error("❌ Error fetching director certificates:", error);
      }
    };

    fetchDirectors();
  }, []);

  return (
    <section className="honors-wrapper">
      <div className="honors-container">
        {/* Left Section */}
        <div className="honors-image">
          <img src={awardsImg} alt="Awards and Achievements" />
        </div>

        {/* Right Section */}
        <div className="honors-details">
          <h2 className="honors-title">
            Our <span>Achievements</span> & <span>Recognitions</span>
          </h2>

          <p className="honors-description">
            Over the years, our excellence in <strong>Visa Consultation</strong>,
            <strong> Study Abroad Guidance</strong>, and
            <strong> International Internship Programs</strong> has earned us
            numerous awards and recognitions. These honors represent our
            dedication to making global opportunities accessible to aspiring
            students and professionals.
          </p>

          <p className="honors-subtext">
            Every recognition motivates us to keep building trust and delivering
            the highest quality of services in the immigration and global
            education sector.
          </p>

          {/* Dynamic Certificates */}
          <div className="certificates">
            {certificates.length > 0 ? (
              certificates.map((url, index) => (
                <div key={index} className="certificate-card">
                  <img
                    src={`${BASE_URL.replace("/api", "")}${url}`}
                    alt={`Certificate ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <p className="no-certificates">No certificates available yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HonorsAwards;
