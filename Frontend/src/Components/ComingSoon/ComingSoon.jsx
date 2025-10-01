import React, { useState, useEffect } from "react";
import "./ComingSoon.css";
import RoundShapeBg from "../../assets/round shape bg.png";

const ComingSoon = () => {
  const getInitialTargetDate = () => {
    // Check if a target date is already in localStorage
    const storedDate = localStorage.getItem("comingSoonTargetDate");
    if (storedDate) return parseInt(storedDate, 10);
    
    // If not, create a new target date 7 days from now
    const newDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("comingSoonTargetDate", newDate);
    return newDate;
  };

  const [targetDate, setTargetDate] = useState(getInitialTargetDate());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = targetDate - now;

      if (distance < 0) {
        // Reset countdown for another 7 days
        const newTarget = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
        setTargetDate(newTarget);
        localStorage.setItem("comingSoonTargetDate", newTarget);
        distance = newTarget - now;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={`ComingSoon-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="ComingSoon-shape-bg">
        <img src={RoundShapeBg} alt="round-shape" />
      </div>
      <h1 className="ComingSoon-title">Coming Soon</h1>
      <div className="ComingSoon-countdown">
        <div className="ComingSoon-time">
          <h2>{timeLeft.days}</h2>
          <p>Days</p>
        </div>
        <span>:</span>
        <div className="ComingSoon-time">
          <h2>{timeLeft.hours}</h2>
          <p>Hrs</p>
        </div>
        <span>:</span>
        <div className="ComingSoon-time">
          <h2>{timeLeft.minutes}</h2>
          <p>Mins</p>
        </div>
        <span>:</span>
        <div className="ComingSoon-time">
          <h2>{timeLeft.seconds}</h2>
          <p>Sec</p>
        </div>
      </div>
      <div className="ComingSoon-actions">
        <a href="tel:7789801327" className="ComingSoon-btn call">📞 Call Now</a>
        <a href="https://wa.me/917789801327" target="_blank" rel="noopener noreferrer" className="ComingSoon-btn whatsapp">💬 WhatsApp Now</a>
      </div>
      <div className="ComingSoon-loader"></div>
      <div className="ComingSoon-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light" : "Dark"}
      </div>
    </div>
  );
};

export default ComingSoon;
