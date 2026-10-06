// src/Components/PageLoader/PageLoader.jsx
import React, { useEffect, useState } from "react";
import "./PageLoader.css";

const PageLoader = ({ loading, setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    let hideTimer;
    if (loading) {
      setProgress(0);
      let current = 0;
      timer = setInterval(() => {
        current += 2;
        if (current >= 100) {
          current = 100;
          clearInterval(timer);
          hideTimer = setTimeout(() => setLoading(false), 250);
        }
        setProgress(current);
      }, 20);
    }
    return () => {
      clearInterval(timer);
      clearTimeout(hideTimer);
    };
  }, [loading, setLoading]);

  if (!loading) return null;

  return (
    <div className="fx-loader" role="status" aria-live="polite">
      <div className="fx-cloud fx-cloud--a" />
      <div className="fx-cloud fx-cloud--b" />

      <div className="fx-box">
        {/* Globe + orbiting plane */}
        <div className="fx-stage">
          <div className="fx-orbit">
            <span className="fx-trail" />
            <svg className="fx-plane" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>

          <svg className="fx-globe" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <radialGradient id="fxGlobeFill" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#4cc3ff" />
                <stop offset="55%" stopColor="#1273d6" />
                <stop offset="100%" stopColor="#062a73" />
              </radialGradient>
              <clipPath id="fxGlobeClip">
                <circle cx="50" cy="50" r="46" />
              </clipPath>
            </defs>
            <circle cx="50" cy="50" r="46" fill="url(#fxGlobeFill)" />
            <g clipPath="url(#fxGlobeClip)" className="fx-grid">
              <ellipse className="fx-meridian fx-m1" cx="50" cy="50" rx="46" ry="46" />
              <ellipse className="fx-meridian fx-m2" cx="50" cy="50" rx="46" ry="46" />
              <ellipse className="fx-meridian fx-m3" cx="50" cy="50" rx="46" ry="46" />
              <line x1="4" y1="50" x2="96" y2="50" />
              <ellipse cx="50" cy="50" rx="46" ry="22" />
              <path d="M8 30 Q50 40 92 30" />
              <path d="M8 70 Q50 60 92 70" />
            </g>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff" strokeOpacity=".35" />
          </svg>
        </div>

        {/* Brand */}
        <h1 className="fx-brand">
          <span className="fx-brand-blue">flyi</span>
          <span className="fx-brand-orange">x</span>
          <span className="fx-brand-blue">o</span>
        </h1>
        <p className="fx-tag">Preparing your journey</p>

        {/* Progress */}
        <div
          className="fx-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="fx-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="fx-percent">{progress}%</p>
      </div>
    </div>
  );
};

export default PageLoader;