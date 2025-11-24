import React, { useEffect, useState } from "react";
import "./ApplyNowBanner.css";
import BASE_URL from "../../Api";
import { useParams } from "react-router-dom";

// Assets
import IATALogo from "../../assets/iata-logo.webp";
import Mlogo from "../../assets/m-logo.webp";
import Securelogo from "../../assets/secure-logo.webp";
import tafilogo from "../../assets/tafi-logo.webp";

const ApplyNowBanner = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);

  // Convert "/uploads/image.webp" → "http://domain.com/uploads/image.webp"
  const getUrl = (path) => {
    if (!path) return "";
    return `${BASE_URL.replace("/api", "")}${path}`;
  };

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(`${BASE_URL}/visas/published/${id}`);
        const data = await res.json();

        if (data.success) {
          setVisa(data.data);
        }
      } catch (err) {
        console.error("Error fetching visa:", err);
      }
    };

    fetchVisa();
  }, [id]);

  const bannerImageUrl =
    visa && visa.bannerUrl ? getUrl(visa.bannerUrl) : "";

  return (
    <div
      className="applyBanner"
      style={{
        backgroundImage: bannerImageUrl
          ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${bannerImageUrl})`
          : "none",
      }}
    >
      <div className="applyBanner-wrapper">

        {/* LEFT */}
        <div className="applyBanner-left">
          <h1 className="applyBanner-title">
            {visa ? `${visa.country} Visa Online` : "Visa Online"}
          </h1>

          <div className="applyBanner-subcontent">
            {visa?.specialImageUrl && (
              <img
                src={getUrl(visa.specialImageUrl)}
                alt="Special"
                className="applyBanner-specialImg"
              />
            )}

            <div className="applyBanner-details">
              <p className="applyBanner-tagline">
                {visa?.approvalTagline || ""}
              </p>

              <div className="applyBanner-infoRow">
                {visa?.processingTime && (
                  <span className="applyBanner-infoItem">
                    <strong>Processing:</strong> {visa.processingTime}
                  </span>
                )}

                {visa?.startingPrice && (
                  <span className="applyBanner-infoItem">
                    <strong>From:</strong> {visa.startingPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="applyBanner-right">
          <div className="applyBanner-badge">
            {visa?.approvalTagline || "High Approval Rate"}
          </div>

          <div className="applyBanner-logos">
            <img src={IATALogo} className="applyBanner-logo" alt="IATA" />
            <img src={tafilogo} className="applyBanner-logo" alt="TAFI" />
            <img src={Mlogo} className="applyBanner-logo" alt="M" />
            <img src={Securelogo} className="applyBanner-logo" alt="Secure" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyNowBanner;
