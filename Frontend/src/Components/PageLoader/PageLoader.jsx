// src/Components/PageLoader/PageLoader.js
import React, { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import "./PageLoader.css";

const PageLoader = ({ loading, setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      setProgress(0);
      let current = 0;
      timer = setInterval(() => {
        current += 2; // increment faster
        if (current >= 100) {
          current = 100;
          clearInterval(timer);
          setTimeout(() => setLoading(false), 200); // Hide loader slightly after full
        }
        setProgress(current);
      }, 20); // ~1s total
    }
    return () => clearInterval(timer);
  }, [loading, setLoading]);

  if (!loading) return null;

  return (
    <div className="page-loader">
      <div className="loader-box">
        <ClockLoader color="#18b495" size={90} />
        <p className="loader-text">Loading... {progress}%</p>
      </div>
    </div>
  );
};

export default PageLoader;
