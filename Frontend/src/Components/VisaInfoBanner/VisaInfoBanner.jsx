import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VisaInfoBanner.css";
import visaBanner from "../../assets/visa-info-banner.webp";
import { useParams } from "react-router-dom";
import BASE_URL from "../../Api"; // ✅ Example: http://localhost:5000/api

const VisaInfoBanner = () => {
  const { id } = useParams(); // 🔹 Get visa ID from URL
  const [visaName, setVisaName] = useState("");

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visatypes/${id}`);
        setVisaName(res.data.data.visaName || "Visa");
      } catch (err) {
        console.error("Error fetching visa details:", err);
      }
    };

    if (id) fetchVisaDetails();
  }, [id]);

  return (
    <section
      className="visa-info-banner"
      style={{ backgroundImage: `url(${visaBanner})` }}
    >
      <div className="visa-info-banner-overlay">
        <div className="visa-info-banner-content">
          <p className="visa-info-banner-subtitle">VISA INFO</p>
          <h1 className="visa-info-banner-title">
            Discover this {visaName} Information
          </h1>
          <div className="visa-info-banner-breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-divider">{">"}</span>
            <span>Visa</span>
            <span className="breadcrumb-divider">{">"}</span>
            <span className="breadcrumb-current">{visaName}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaInfoBanner;
