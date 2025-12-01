import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../Api";
import "./CheckStatus.css";
import {
  X, Mail, Hash, CheckCircle, Clock3, FileCheck, ShieldCheck, XCircle
} from "lucide-react";

const CheckStatus = ({ onClose }) => {
  const [applicationID, setApplicationID] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [statusData, setStatusData] = useState(null);

  const handleCheck = async () => {
    if (!applicationID.trim()) {
      alert("Please enter your Application ID");
      return;
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/applications/${applicationID}/status`
      );

      if (res.data.success) {
        setStatusData(res.data);
        setShowResult(true);
      }
    } catch (err) {
      alert("Invalid Application ID — Please check again.");
    }
  };

  // Icons for steps
  const icons = [CheckCircle, FileCheck, Clock3, ShieldCheck];

  return (
    <div className="cs-overlay">
      <div className="cs-popup">

        <button className="cs-close" onClick={onClose}>
          <X size={22} />
        </button>

        {!showResult && (
          <>
            <h2 className="cs-title">Track Your Application</h2>
            <p className="cs-subtitle">Enter your Application ID below.</p>

            <div className="cs-form">
              <label className="cs-label">Application ID</label>

              <div className="cs-input-box">
                <Hash size={18} />
                <input
                  type="text"
                  placeholder="e.g., VISA-2025-845723"
                  value={applicationID}
                  onChange={(e) => setApplicationID(e.target.value)}
                />
              </div>

              <button className="cs-btn" onClick={handleCheck}>
                Check Status
              </button>

              <p className="cs-info-text">
                <Mail size={16} /> Status updates will be sent to your email / phone.
              </p>
            </div>
          </>
        )}

        {showResult && statusData && (
          <div className="cs-result">

            <div className="cs-summary">
              <div className="cs-summary-item">
                <Hash size={18} />
                <span>{statusData.applicationId}</span>
              </div>

              <div className="cs-summary-item">
                <Mail size={18} />
                <span>{statusData.email}</span>
              </div>
            </div>

            <div className="cs-steps">
              {statusData.steps.map((step, index) => {
                const Icon = icons[index] || ShieldCheck;
                const completed = statusData.stepCompleted >= step.id;

                return (
                  <div
                    key={step.id}
                    className={`cs-step ${completed ? "completed" : "pending"}`}
                  >
                    {completed ? (
                      <CheckCircle size={20} />
                    ) : (
                      <XCircle size={20} />
                    )}

                    <p>{step.name}</p>
                  </div>
                );
              })}
            </div>

            <p className="cs-final-note">
              Current Status:  
              <b style={{ color: "#fff" }}> {statusData.visaStatus} </b>
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default CheckStatus;
