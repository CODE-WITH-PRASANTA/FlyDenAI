import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaBookOpen, FaIdBadge } from "react-icons/fa";
import { MdMedicalServices, MdLanguage } from "react-icons/md";
import "./TrainingSection.css";

// Import your images
import train1 from "../../assets/train1.webp";
import train2 from "../../assets/train2.webp";
import train3 from "../../assets/train3.webp";
import train4 from "../../assets/train4.webp";

// Data for the cards
const cards = [
  {
    id: 1,
    title: "IELTS Courses",
    desc: "Get expert coaching and practical sessions to achieve your desired band score.",
    img: train1,
    icon: <FaBookOpen />,
  },
  {
    id: 2,
    title: "OET Coaching",
    desc: "Professional guidance for healthcare professionals to excel in OET exams.",
    img: train2,
    icon: <MdMedicalServices />,
  },
  {
    id: 3,
    title: "TOEFL Coaching",
    desc: "Comprehensive training for reading, writing, and speaking excellence.",
    img: train3,
    icon: <MdLanguage />,
  },
  {
    id: 4,
    title: "Citizenship Test",
    desc: "Prepare confidently with simulated practice and government test support.",
    img: train4,
    icon: <FaIdBadge />,
  },
];

export default function TrainingSection() {
  // Optional: Magnetic hover effect for buttons
  useEffect(() => {
    const buttons = document.querySelectorAll(".read-more-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
      });
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mousemove", () => {});
        btn.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <section className="training-section">
      <p className="section-subtitle">Training & Certification</p>
      <h2 className="section-title">
        We Provide Special Care <br /> To Make Easy Your Dream
      </h2>

      <div className="cards-container">
        {cards.map(({ id, title, desc, img, icon }) => (
          <div key={id} className="card">
            {/* Image Circle */}
            <div className="img-circle">
              <img src={img} alt={title} />
            </div>

            {/* Icon Overlay */}
            <div className="icon-circle">{icon}</div>

            {/* Content */}
            <h3 className="card-title">{title}</h3>
            <p className="card-desc">{desc}</p>

            {/* Read More Button */}
            <button className="read-more-btn">
              <span className="read-more-text">Read More</span>
              <FiArrowRight className="arrow-icon" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
